import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface RootProps {
    pageData: PageData
}

interface RootState {
    user: string,
    dest: string
}

export default class Root extends React.Component<RootProps, RootState> {
    private wrapperStyle: CSSProperties = {
        padding: "0 30 50 50"
    };

    constructor(props: RootProps) {
        super(props);
        const defaultUser = localStorage.getItem("user");
        const defaultDest = localStorage.getItem("dest");
        this.state = {
            user: defaultUser || "名無しさん",
            dest: defaultDest || "global"
        }
    }

    onUserChange = (event) => {
        const {value} = event.target;
        localStorage.setItem("user", value);
        this.setState({
            user: value
        })
    };

    onDestChange = (event) => {
        const {value} = event.target;
        localStorage.setItem("dest", value);
        this.setState({
            dest: value
        })
    };

    render() {
        return (
            <div style={this.wrapperStyle}>
                <h1>{this.props.pageData.title}</h1>
                <span>
                    表示ユーザ名: <input type="text" value={this.state.user} onChange={this.onUserChange}/>
                </span>
                <span>
                    送信先: <input type="text" value={this.state.dest} onChange={this.onDestChange}/>
                </span>
                <GyaonList user={this.state.user} dest={this.state.dest} list={this.props.pageData.sounds}/>
            </div>
        )
    }
}
