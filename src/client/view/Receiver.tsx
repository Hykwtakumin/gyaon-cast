import * as React from "react"
import {CSSProperties} from "react"
import {upload} from "gyaonup";
import axios from "axios";
import {Gyaon, GyaonResponse, ReactionLinda, ReactionMongo, Record, RecordLinda, Tuple} from "../../share/data";
import Reaction from "./Reaction";
import {encodeWAV, mergeBuffers} from "../../util/audio";

declare var Linda: any;

interface ReceiverProps {
    tupleSpace: string,
    user: string,
    isPlay: boolean,
    isRec: boolean,
    reactions: ReactionMongo[]
}

interface ReceiverState {
    user: string,
    isPlay: boolean,
    isRec: boolean,
    reactions: ReactionMongo[]
}

export default class Receiver extends React.Component<ReceiverProps, ReceiverState> {
    private ctx: AudioContext = new AudioContext();
    private scriptProcessor: ScriptProcessorNode;
    private localMediaStream: MediaStream;
    private mediaStreamSource: MediaStreamAudioSourceNode;
    private audioBufferArray: Array<Float32Array> = [];
    private wrapperStyle: CSSProperties = {
        flex: 2,
        height: "100%",
        overflow: "auto",
        padding: 16
    };

    private readonly MAX_RECORD_MIN: number = 5;
    private readonly BUFFER_SIZE: number = 4096;
    private readonly SAMPLE_RATE: number = this.ctx.sampleRate;

    constructor(props) {
        super(props);
        const {user, isPlay, isRec, reactions} = props;
        this.state = {
            user: user,
            isPlay: isPlay,
            isRec: isRec,
            reactions: reactions
        }
    }

    async componentDidMount() {
        if (this.state.isRec) {
            this.initRecorder()
        }
        const io = require("../../lib/socket.io.js");
        const socket = io.connect("https://linda-server.herokuapp.com:443");
        require("../../lib/linda.js");
        const linda = new Linda().connect(socket);
        const ts = linda.tuplespace(this.props.tupleSpace);

        linda.io.on('connect', () => {
            console.dir('socket.io connect!!');
            ts.watch({type: "gyaon"}, (err, tuple) => {
                if (err) {
                    console.dir(err)
                } else {
                    const {data} = tuple;
                    console.log(data);
                    const {isReaction} = data as Tuple;
                    if (isReaction) {
                        this.receiveReaction(data);
                        return
                    }
                    this.receiveRecord(data);
                }
            });
        });
    }

    initRecorder = async () => {
        await this.requestPermission();
        this.start();
    };

    componentWillReceiveProps(newProps: ReceiverProps) {
        const {user, isPlay, isRec} = newProps;
        this.setState({
            user: user,
            isPlay: isPlay,
            isRec: isRec
        });
    }

    receiveReaction = async (tuple: ReactionLinda) => {
        console.log("received reaction");
        const {url, id} = tuple;
        if (this.state.isPlay) {
            new Audio(url).play(); //リアクションだけ再生
        }
        this.setState({
            reactions: [tuple as ReactionMongo, ...this.state.reactions]//this.state.reactions.push(el)
        });

        let recordUrl: string = "";
        if (this.state.isRec) {
            const {endpoint, object} = await this.upload();
            const comment = ""; //もしくは音声認識結果
            recordUrl = `${endpoint}/sound/${object.key}`;
            await axios.post(`${endpoint}/comment/${object.key}`, {value: comment});

            const recordParams: Record = {
                reactionId: id,
                url: recordUrl,
                title: comment,
                user: this.state.user,
                tupleSpace: this.props.tupleSpace
            };
            axios.post("/record", recordParams);
        }
    };

    receiveRecord = async (tuple: RecordLinda) => {
        console.log("received record");
        const reactions = [...this.state.reactions];
        for (let reaction of reactions) {
            if (reaction.id === tuple.reactionId) {
                reaction.links.push(tuple as Gyaon);
                this.setState({
                    reactions: reactions
                });
                return
            }
        }
    };

    requestPermission = async () => {
        this.localMediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
    };

    start = () => {
        this.mediaStreamSource = this.ctx.createMediaStreamSource(this.localMediaStream);
        this.scriptProcessor = this.ctx.createScriptProcessor(this.BUFFER_SIZE, 1, 1);
        this.mediaStreamSource.connect(this.scriptProcessor);
        this.scriptProcessor.onaudioprocess = (event => {
            const channel = event.inputBuffer.getChannelData(0);
            if (this.audioBufferArray.length * this.BUFFER_SIZE > this.SAMPLE_RATE * this.MAX_RECORD_MIN) {
                this.audioBufferArray.shift()
            }
            this.audioBufferArray.push(new Float32Array(channel))
        });
        this.scriptProcessor.connect(this.ctx.destination);
    };

    upload = async () => {
        const dataview = encodeWAV(mergeBuffers(this.audioBufferArray), this.SAMPLE_RATE);
        const blob = new Blob([dataview], {type: 'audio/wav'});
        const res = await upload(this.state.user, blob);
        return res["data"] as GyaonResponse;
    };

    render() {
        const reactions = this.state.reactions.map(reaction => <Reaction reactionParams={reaction}/>);
        return (
            <div style={this.wrapperStyle}>
                {reactions}
            </div>
        )
    }
}