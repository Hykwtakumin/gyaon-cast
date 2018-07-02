import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";
import Caster from "./Caster";
import Receiver from "./Receiver";
import {OptionValue} from "./Root";

type OptionProps = {
    defaultValue: OptionValue,
    onUserChange: any,
    onIsPlayChange: any,
    onIsRecChange: any
}

export default class Options extends React.Component<OptionProps, {}> {
    private wrapperStyle: CSSProperties = {
        padding: 10,
        boxShadow: "#ccc 0px 0px 14px"
    };

    constructor(props: OptionProps) {
        super(props);
    }

    setIsEditName = (isEditName: boolean) => {
        window["isEditName"] = isEditName; //つらい
    };

    render() {
        const {user, isPlay, isRec} = this.props.defaultValue;
        return (
            <div style={this.wrapperStyle}>
                <span style={{marginRight: 20}}>
                    Your name: <input type="text" value={user} onFocus={e => this.setIsEditName(true)} onBlur={e => this.setIsEditName(false)} onChange={this.props.onUserChange}/>
                </span>
                <span style={{marginRight: 20}}>
                    Play: <input type="checkbox" checked={isPlay} onChange={this.props.onIsPlayChange}/>
                </span>
                <span style={{marginRight: 20}}>
                    Rec: <input type="checkbox" checked={isRec} onChange={this.props.onIsRecChange}/>
                </span>
            </div>
        )
    }
}
