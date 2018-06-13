import * as React from "react"
import * as ReactDOM from "react-dom"
import GyaonList from "./view/GyaonList"

class App extends React.Component {
    render() {
        return (
            <GyaonList />
        )
    }
}

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById("container"))
};
