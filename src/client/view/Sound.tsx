import * as React from "react";
import {CSSProperties} from "react";
import axios from "axios";

interface SoundProps {
    title?: string,
    url?: string
}

interface SoundState {
    title: string,
    url: string,
    isEdit: boolean,
    isPlaying: boolean
}

interface GyaonTuple {
    type: "gyaon",
    user: string,
    message: string,
    url: string
}

export default class Sound extends React.Component<SoundProps, SoundState> {
    private audioEl: HTMLAudioElement = new Audio();
    private style: CSSProperties = {
        height: 150,
        width: 150,
        margin: "0 30 30 0",
        padding: 10,
        borderRadius: 5,
        boxShadow: "0 0.5px 1px 1px #ccc",
        cursor: "pointer"
    };

    constructor(props: SoundProps) {
        super(props);
        this.state = {
            title: "わかる",
            url: "https://gyaon.herokuapp.com/sound/639cf42494cdecf2821f5b7f044ff67a.wav",
            isEdit: false,
            isPlaying: false
        }
    }

    componentDidMount() {
        this.audioEl.src = this.state.url;
        this.audioEl.addEventListener("ended", this.onend);
    }

    cast = () => {
        const params = new URLSearchParams();
        const tuple: GyaonTuple = {
            type: "gyaon",
            user: "satake",
            message: this.state.title,
            url: this.state.url
        };
        params.append("tuple", JSON.stringify(tuple));
        axios.post("https://linda-server.herokuapp.com/masuilab", params);
    };

    pause = () => {
        this.audioEl.pause();
        this.audioEl.currentTime = 0;
    };

    onend = () => {
        this.audioEl.currentTime = 0;
        this.setState({
            isPlaying: false
        })
    };

    onClick = async () => {
        this.cast();
        if (this.state.isPlaying === true) {
            this.pause();
        }
        // await this.audioEl.play();
        this.setState({
            isPlaying: true
        })
    };

    render() {
        return (
            <div style={this.style} onClick={this.onClick}>
                {this.state.title}

                <audio src={this.state.url} ref={el => {
                    this.audioEl = el;
                }}/>
            </div>
        )
    }
}