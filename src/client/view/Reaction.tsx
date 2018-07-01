import * as React from "react";
import {Gyaon, ReactionMongo} from "../../share/data";
import * as dateFormat from "dateformat";
import HoverToPlayText from "./HoverToPlayText";

interface ReactionProps {
    reactionParams: ReactionMongo
}

export default class Reaction extends React.Component<ReactionProps, {}> {
    private readonly wrapperStyle = {
        marginBottom: 10
    };

    render(){
        const {title, time, user, url, links} = this.props.reactionParams;
        const reactionAudio = <HoverToPlayText src={url} text={title}/>;
        const reactionEl = <div style={{whiteSpace: "nowrap"}}>{dateFormat(new Date(time), "mm/dd HH:MM")} {user}「{reactionAudio}」</div>;
        const records = links.map((record: Gyaon) => {
            const {title, url, user} = record;
            const recordedAudio = <HoverToPlayText src={url} text={title}/>;
            return <div style={{marginLeft: 20, whiteSpace: "nowrap"}}>{user} 「{recordedAudio}」</div>
        });
        return(
            <div style={this.wrapperStyle}>
                {reactionEl}
                {records}
            </div>
        )
    }
}