import * as React from "react"
import * as ReactDOM from "react-dom"
import Root from "./view/Root"
import {PageData} from "../share/data"

interface AppProps {
    tupleSpace: string,
    reaction: any[],
    pageData: PageData
}

class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <Root tupleSpace={this.props.tupleSpace} reaction={this.props.reaction} pageData={this.props.pageData}/>
        )
    }
}

window.onload = () => {
    //expressから送信したJSONがwindow.pageDataに格納されている
    ReactDOM.render(<App tupleSpace={window["tupleSpace"]} reaction={[]} pageData={window["pageData"]}/>, document.getElementById("container"))
};