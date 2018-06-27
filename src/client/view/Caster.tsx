import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface CasterProps {
    user: string,
    tupleSpace: string,
    pageData: PageData
}

interface CasterState {
    user: string
}

export default class Caster extends React.Component<CasterProps, CasterState> {
    private wrapperStyle: CSSProperties = {
        flex: 3,
        marginTop: 16
    };

    constructor(props: CasterProps) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    componentWillReceiveProps(newProps: CasterProps){
        this.setState({
            user: newProps.user
        })
    }

    //TODO props変わったらいろいろ初期化

    onUserChange = (event) => {
        const {value} = event.target;
        localStorage.setItem("user", value);
        this.setState({
            user: value
        })
    };
    render() {
        const {title} = this.props.pageData;
        const {user} = this.state;
        return (
            <div style={this.wrapperStyle}>
                <span style={{marginRight: 20}}>
                    <a href={`https://scrapbox.io/gyaonlist/${title}`} target="_blank">/gyaonlist/{title}</a>
                </span>
                <GyaonList user={user} dest={this.props.tupleSpace} list={this.props.pageData.sounds}/>
            </div>
        )
    }
}
