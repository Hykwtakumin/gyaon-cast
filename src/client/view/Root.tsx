import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";
import Caster from "./Caster";
import Receiver from "./Receiver";
import Options from "./Options";

export type OptionValue = {
    user: string,
    isPlay: boolean,
    isRec: boolean
}

type RootProps = {
    tupleSpace: string,
    reaction: Array<any>,
    pageList: PageData[]
}

type RootState = {} & OptionValue

export default class Root extends React.Component<RootProps, RootState> {
    private wrapperStyle: CSSProperties = {};

    constructor(props: RootProps) {
        super(props);
        this.state = {
            user: localStorage.getItem("user") || "名無しさん",
            isPlay: Boolean(localStorage.getItem("isPlay")),
            isRec: Boolean(localStorage.getItem("isRec"))
        }
    }

    onUserChange = (event) => {
        const {value} = event.target;
        localStorage.setItem("user", value);
        this.setState({
            user: value
        });
        event.stopPropagation();
    };

    onIsPlayChange = (event) => {
        const {checked} = event.target;
        localStorage.setItem("isPlay", checked ? "true" : "");
        this.setState({
            isPlay: checked
        })
    };

    onIsRecChange = (event) => {
        const {checked} = event.target;
        localStorage.setItem("isRec", checked ? "true" : "");
        this.setState({
            isRec: checked
        })
    };

    render() {
        const {tupleSpace, reaction, pageList} = this.props;
        const {user, isPlay, isRec} = this.state;
        return (
            <div style={this.wrapperStyle}>
                <Options defaultValue={this.state as OptionValue} onUserChange={this.onUserChange}
                         onIsPlayChange={this.onIsPlayChange} onIsRecChange={this.onIsRecChange}/>
                <div style={{display: "flex"}}>
                    <Receiver tupleSpace={tupleSpace} reaction={reaction} user={user} isPlay={isPlay} isRec={isRec}/>
                    <Caster user={user} tupleSpace={tupleSpace} pageList={pageList}/>
                </div>
            </div>
        )
    }
}
