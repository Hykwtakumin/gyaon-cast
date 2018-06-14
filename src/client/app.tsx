import * as React from "react"
import * as ReactDOM from "react-dom"
import Root from "./view/Root"

class App extends React.Component {
    render() {
        return (
            <Root/>
        )
    }
}

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById("container"))
};