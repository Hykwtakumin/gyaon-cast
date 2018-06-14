import * as React from "react"
import Sound from "./Sound"
import {CSSProperties} from "react";

interface GyaonListProps {
}

interface GyaonListState {
    sounds: JSX.Element[]
}

export default class GyaonList extends React.Component<GyaonListProps, GyaonListState> {
    private wrapperStyle: CSSProperties = {
        padding: 50
    };
    private listStyle: CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        marginTop: 20
    };

    constructor(props: GyaonListProps) {
        super(props);

        this.state = {
            sounds: [
                <Sound playKey="a" title="休憩しよう" url="https://gyaon.com/sounds/e546f507f7216c8d60fbaec06df75a0f/513320493a5a9d68cf3b6b322c39cdfd.wav"/> ,
                <Sound playKey="s" title="静かに" url="https://gyaon.com/sounds/hykwtakumin/fbfe655808ceb843b8bfeede16441ad3.wav"/>,
                <Sound playKey="d" title="なるほど！" url="https://gyaon.com/sounds/hykwtakumin/3f9a6223066208613922174c71ead7dd.wav"/>,
                <Sound playKey="f" title="勉強になった！" url="https://gyaon.com/sounds/hykwtakumin/bb84a0536c774df007c9018369f3f39e.wav"/>,
                <Sound playKey="g" title="わかる〜" url="https://gyaon.com/sound/639cf42494cdecf2821f5b7f044ff67a.wav"/>,
                <Sound playKey="h" title="わからん" url="https://gyaon.com/sounds/hykwtakumin/6c82986f5b3b3779075f81b3e76bcfcb.wav"/>,
                <Sound playKey="j" title="たしかに" url="https://gyaon.com/sounds/hykwtakumin/86428cf1fc9676e1823c91c9e1008287.wav"/>,
                <Sound playKey="k" title="ありがとうございます" url="https://gyaon.com/sounds/hykwtakumin/d8fd09e52f5cb263c0eacd5bfd3840fd.wav"/>,
                <Sound playKey="l" title="そうだね" url="https://gyaon.com/sounds/hykwtakumin/db6f222e6ae43f5b891ee830cc156e8f.wav"/>,
                <Sound playKey="semicolon" title="いい話だ" url="https://gyaon.com/sounds/hykwtakumin/6dab65613f44d86963d6dece2db08003.wav"/>,
                <Sound playKey="q" title="はい！" url="https://gyaon.com/sounds/hykwtakumin/bfdca397f8255d9cbd62fb8c5241875f.wav"/>,
                <Sound playKey="w" title="ええやん" url="https://gyaon.com/sounds/hykwtakumin/09a911da832832f8d6c8aaa2d6762397.wav"/>,
                <Sound playKey="e" title="なんぼなん？" url="https://gyaon.com/sounds/hykwtakumin/41c6ab4477b3037eed6df46874013b76.wav"/>,
                <Sound playKey="r" title="すごーい" url="https://gyaon.com/sounds/satake/18791e44ab96c81a69b65885cd2e7058.mp3"/>,
                <Sound playKey="t" title="おめでとう" url="https://gyaon.com/sound/2016-06-20%2020:31:00.wav"/>,
            ]
        }
    }

    add = () => {
        this.setState({
            sounds: this.state.sounds.concat(<Sound />)
        })
    };

    render() {
        const addButton = (
            <div
                onClick={this.add}
                style={{
                    width: 45,
                    height: 45,
                    margin: "0 auto",
                    fontSize: 30,
                    backgroundColor: "gold",
                    textAlign: "center",
                    borderRadius: 100,
                    fontWeight: "bold",
                    color: "white",
                    cursor: "pointer"
                }}>
                ＋
            </div>
        );

        return (
            <div style={this.wrapperStyle}>
                {addButton}
                <div style={this.listStyle}>
                    {this.state.sounds}
                </div>
            </div>
        )
    }
}