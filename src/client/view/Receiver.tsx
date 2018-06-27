import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface ReceiverProps {
    reaction: any[]
}

interface ReceiverState {
}

export default class Receiver extends React.Component<ReceiverProps, ReceiverState> {
    private wrapperStyle: CSSProperties = {
        flex: 1
    };

    constructor(props: ReceiverProps) {
        super(props);
    }

    render() {
        return (
            <div style={this.wrapperStyle}>Receiver</div>
        )
    }
}
