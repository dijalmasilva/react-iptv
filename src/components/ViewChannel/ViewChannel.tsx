import React from 'react';
import ReactPlayer from "react-player";
import {Channel} from "../../App";

interface ViewChannelProps {
    channel?: Channel;
    onBack: () => void;
}

function ViewChannel ({ channel, onBack } : ViewChannelProps): JSX.Element {

    if (!channel) {
        return <h5>Canal inválido!</h5>
    }

    return (
        <div className="channel-info">
            <button className="go-back" onClick={onBack}> Voltar </button>
            <h1>{channel.inf.title}</h1>
            <h2>{channel.inf.groupTitle}</h2><br/>
            <ReactPlayer controls height={300} width={'100%'} url={channel.url}/>
        </div>
    )
}

export default ViewChannel