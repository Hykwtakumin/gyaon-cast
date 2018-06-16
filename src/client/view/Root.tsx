import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface RootProps {
    pageData: PageData
}

interface RootState {
}

export default class Root extends React.Component<RootProps, RootState> {
    private wrapperStyle: CSSProperties = {
        padding: "0 30 50 50"
    };
    constructor(props: RootProps) {
        super(props);
    }

    onUserChange = (event) => {
        this.setState({
            user: event.target.value
        })
    };

    render() {
        return (
            <div style={this.wrapperStyle}>
                <h1>{this.props.pageData.title}</h1>
                <GyaonList list={this.props.pageData.sounds}/>
            </div>
        )
    }
}
