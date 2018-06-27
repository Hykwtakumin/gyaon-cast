import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface CasterProps {
    tupleSpace: string,
    pageData: PageData
}

interface CasterState {
    user: string,
    dest: string
}

export default class Caster extends React.Component<CasterProps, CasterState> {
    private wrapperStyle: CSSProperties = {
        flex: 1
    };

    constructor(props: CasterProps) {
        super(props);
        const defaultUser = localStorage.getItem("user");
        this.state = {
            user: /*defaultUser || */"名無しさん",
            dest: this.props.tupleSpace
        }
    }

    onUserChange = (event) => {
        const {value} = event.target;
        localStorage.setItem("user", value);
        this.setState({
            user: value
        })
    };
    render() {
        const {title} = this.props.pageData;
        const {user, dest} = this.state;
        return (
            <div style={this.wrapperStyle}>
                <h1>gyaon-cast</h1>
                <span style={{marginRight: 20}}>
                    リスト: <a href={`https://scrapbox.io/gyaonlist/${title}`} target="_blank">{title}</a>
                </span>
                <span style={{marginRight: 20}}>
                    表示ユーザ名: <input type="text" value={user} onChange={this.onUserChange}/>
                </span>
                <span style={{marginRight: 20}}>
                    送信先: {this.props.tupleSpace}
                </span>
                <GyaonList user={user} dest={this.props.tupleSpace} list={this.props.pageData.sounds}/>
            </div>
        )
    }
}
