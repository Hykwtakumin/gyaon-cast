import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";
import Caster from "./Caster";
import Receiver from "./Receiver";

interface RootProps {
    reaction: Array<any>,
    pageData: PageData
}

interface RootState {
}

export default class Root extends React.Component<RootProps, RootState> {
    private wrapperStyle: CSSProperties = {
        display: "flex"
    };

    constructor(props: RootProps) {
        super(props);
    }

    render() {
        return ( //flexbox
            <div style={this.wrapperStyle}>
                <Receiver reaction={this.props.reaction}/>
                <Caster pageData={this.props.pageData}/>
            </div>
        )
    }
}
