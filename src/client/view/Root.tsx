import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface RootProps {
    pageData: PageData
}

interface RootState {
    user: string
}

export default class Root extends React.Component<RootProps, RootState> {
    private wrapperStyle: CSSProperties = {
        padding: "0 30 50 50"
    };

    constructor(props: RootProps) {
        super(props);
        const defaultUser = localStorage.getItem("user");
        this.state = {
            user: defaultUser || "名無しさん"
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
        return (
            <div style={this.wrapperStyle}>
                <h1>{this.props.pageData.title}</h1>
                <span>
                    表示ユーザ名: <input type="text" value={this.state.user} onChange={this.onUserChange}/>
                </span>
                <GyaonList user={this.state.user} list={this.props.pageData.sounds}/>
            </div>
        )
    }
}
