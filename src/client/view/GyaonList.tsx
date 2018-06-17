import * as React from "react"
import SoundEl from "./SoundEl"
import {CSSProperties} from "react";
import {Sound} from "../../share/data";

interface GyaonListProps {
    user: string,
    dest: string,
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

    private soundElementsFactory = (list: Sound[], user: string, dest: string): JSX.Element[] => {
        return list.map(sound => <SoundEl user={user} dest={dest} title={sound.title} playKey={sound.keyboard} url={sound.url}/>)
    };

    constructor(props: GyaonListProps) {
        super(props);
        this.state = {
            sounds: this.soundElementsFactory(props.list, props.user, props.dest)
        }
    }

    componentWillReceiveProps(newProps: GyaonListProps) {
        this.setState({
            sounds: this.soundElementsFactory(newProps.list, newProps.user, newProps.dest)
        })
    };

    render() {
        return (
            <div style={this.listStyle}>
                {this.state.sounds}
            </div>
        )
    }
}