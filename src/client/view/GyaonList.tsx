import * as React from "react"
import Sound from "./Sound"
import {CSSProperties} from "react";

interface GyaonListState {
    sounds: JSX.Element[]
}

export default class GyaonList extends React.Component<{}, GyaonListState> {
    private wrapperStyle: CSSProperties = {
        padding: 50
    };
    private listStyle: CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        marginTop: 20
    };

    constructor(props: {}) {
        super(props);

        this.state = {
            sounds: []
        }
    }

    add = () => {
        this.setState({
            sounds: this.state.sounds.concat(<Sound/>)
        })
    };

    render() {
        const addButton = (
            <div
                onClick={this.add}
                style={{
                    width: 45,
                    height: 45,
                    margin: "0 auto",
                    fontSize: 30,
                    backgroundColor: "gold",
                    textAlign: "center",
                    borderRadius: 100,
                    fontWeight: "bold",
                    cursor: "pointer"
                }}>
                ＋
            </div>
        );

        return (
            <div style={this.wrapperStyle}>
                {addButton}
                <div style={this.listStyle}>
                    {this.state.sounds}
                </div>
            </div>
        )
    }
}