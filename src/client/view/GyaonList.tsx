import * as React from "react"
import SoundEl from "./SoundEl"
import {CSSProperties} from "react";
import {Sound} from "../../share/data";

interface GyaonListProps {
    list: Sound[]
}

interface GyaonListState {
    sounds: JSX.Element[]
}

export default class GyaonList extends React.Component<GyaonListProps, GyaonListState> {
    private listStyle: CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        marginTop: 20
    };

    constructor(props: GyaonListProps) {
        super(props);
        const soundElements: JSX.Element[] = [];
        for (let sound of this.props.list) {
            soundElements.push(<SoundEl title={sound.title} playKey={sound.keyboard} url={sound.url}/>)
        }
        this.state = {
            sounds: soundElements
        }
    }

    render() {
        return (
            <div style={this.listStyle}>
                {this.state.sounds}
            </div>
        )
    }
}