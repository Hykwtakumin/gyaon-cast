import * as React from "react"
import * as ReactDOM from "react-dom"
import Root from "./view/Root"
import {PageData, ReactionMongo} from "../share/data"

interface AppProps {
    tupleSpace: string,
    reactions: ReactionMongo[],
    pageList: PageData[]
}

class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <Root tupleSpace={this.props.tupleSpace} reactions={this.props.reactions} pageList={this.props.pageList}/>
        )
    }
}

window.onload = () => {
    //expressから送信したJSONがwindowに格納されている
    ReactDOM.render(<App tupleSpace={window["tupleSpace"]} reactions={window["reactions"]} pageList={window["pageList"]}/>, document.getElementById("container"))
};