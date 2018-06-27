import * as React from "react"
import * as ReactDOM from "react-dom"
import Root from "./view/Root"
import {PageData} from "../share/data"

interface AppProps {
    tupleSpace: string,
    reaction: any[],
    pageList: PageData[]
}

class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <Root tupleSpace={this.props.tupleSpace} reaction={this.props.reaction} pageList={this.props.pageList}/>
        )
    }
}

window.onload = () => {
    //expressから送信したJSONがwindowに格納されている
    ReactDOM.render(<App tupleSpace={window["tupleSpace"]} reaction={[]} pageList={window["pageList"]}/>, document.getElementById("container"))
};