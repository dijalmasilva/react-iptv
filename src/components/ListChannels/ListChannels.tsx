import React from 'react';
import {Channel} from "../../App";

interface ListChannelsProps {
    channels: Channel[];
    groupName?: string;
    onSelect: (channel: Channel) => void;
    onBack: () => void;
}

function ListChannels({ channels, groupName, onSelect, onBack} : ListChannelsProps) : JSX.Element {

    const [channelsOfGroup] = React.useState<Channel[]>(channels.filter(channel => channel.inf.groupTitle === groupName));

    return (
        <>
            <button className="go-back" onClick={onBack}> Voltar </button>
            <br />
            <div className="list-groups">
                {
                    channelsOfGroup.map((channel, index) => {
                        return (
                            <div className="group" key={index} onClick={() => onSelect(channel)}>
                                <h4>{channel.inf.title}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ListChannels;