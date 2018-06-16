import * as React from "react";
import {CSSProperties} from "react";
import axios from "axios";
import keycodes from "../util/keycodes";

interface SoundProps {
    title?: string,
    url?: string,
    playKey?: string,
}

interface SoundState {
    user: string
    title: string,
    url: string,
    isEdit: boolean,
    isPlaying: boolean,
    key?: string
}

interface GyaonTuple {
    type: "gyaon",
    user: string,
    message: string,
    url: string
}

export default class SoundEl extends React.Component<SoundProps, SoundState> {
    private audioEl: HTMLAudioElement = new Audio();
    private style: CSSProperties = {
        height: 75,
        width: 150,
        margin: "0 20 20 0",
        padding: 10,
        borderRadius: 5,
        boxShadow: "0 0.5px 1px 1px #ccc",
        cursor: "pointer"
    };

    constructor(props: SoundProps) {
        super(props);
        this.state = {
            user: location.search.substring(1).split('&')[0],
            title: props.title,
            url: props.url,
            isEdit: false,
            isPlaying: false,
            key: props.playKey
        }
    }

    componentDidMount() {
        this.audioEl.src = this.state.url;
        this.audioEl.addEventListener("ended", this.onend);
        window.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.keyCode == keycodes[this.state.key]) {
            this.play();
        }
    };

    cast = () => {
        const params = new URLSearchParams();
        const tuple: GyaonTuple = {
            type: "gyaon",
            user: this.state.user,
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

    play = async () => {
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
            <div style={this.style} onClick={this.play}>
                <div>{this.state.title}</div>
                <div>{this.state.key}</div>
                <audio src={this.state.url} ref={el => {
                    this.audioEl = el;
                }}/>
            </div>
        )
    }
}