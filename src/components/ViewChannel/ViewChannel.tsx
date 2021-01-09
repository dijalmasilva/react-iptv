import React from 'react';
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
            <video width="100%" height="400" controls autoPlay>
                <source src={channel.url} type="video/mp4" />
                <source src={channel.url} type="video/ogg" />
                <source src={channel.url} type="video/mp2t" />
            </video>
        </div>
    )
}

export default ViewChannel