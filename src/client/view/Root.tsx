import * as React from "react"
import GyaonList from "./GyaonList"

interface RootProps {
}

interface RootState {
}

export default class Root extends React.Component<RootProps, RootState> {
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
            <div>
                <GyaonList/>
            </div>
        )
    }
}
