import * as React from "react";
import {Gyaon, ReactionMongo} from "../../share/data";
import * as dateFormat from "dateformat";
import HoverToPlayText from "./HoverToPlayText";

interface ReactionProps {
    reactionParams: ReactionMongo
}

export default class Reaction extends React.Component<ReactionProps, {}> {
    private readonly wrapperStyle = {
        display: "flex",
        marginBottom: 10
    };

    render() {
        const {title, time, user, url, links} = this.props.reactionParams;
        const timeEl = <div style={{flex: "1 1 0%"}}>{dateFormat(new Date(time), "mm/dd HH:MM")}</div>;
        const reactionAudio = <HoverToPlayText src={url} text={title}/>;
        const reactionEl = <div style={{whiteSpace: "nowrap"}}>{user}「{reactionAudio}」</div>;
        const records = links.map((record: Gyaon) => {
            const {title, url, user} = record;
            const recordedAudio = <HoverToPlayText src={url} text={title}/>;
            return <div style={{whiteSpace: "nowrap", overflow: "hidden"}}>{user} 「{recordedAudio}」</div>
        });
        const recordAndReactionEl = (
            <div style={{flex: "2.6 1 0%", overflow: "auto"}}>
                {records}
                {reactionEl}
            </div>
        );
        return (
            <div style={this.wrapperStyle}>
                {timeEl}
                {recordAndReactionEl}
            </div>
        )
    }
}