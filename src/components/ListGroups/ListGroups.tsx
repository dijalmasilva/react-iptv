import React from 'react';
import {Channel} from "../../App";

interface ListGroupProps {
    channels: Channel[];
    onSelect: (groupName: string) => void;
}

function ListGroups ({ channels, onSelect } : ListGroupProps) : JSX.Element {

    const getGroups = () => {
        const groups : string[] = [];
        channels.forEach(channel => {
            const groupTitle = channel.inf.groupTitle;
            if (!groups.includes(groupTitle)) {
                groups.push(groupTitle);
            }
        })

        return groups;
    }

    return (
        <div className="list-groups">
            {
                getGroups().map((groupTitle) => {
                  return (
                      <div className="group" key={groupTitle} onClick={() => onSelect(groupTitle)}>
                          <h4>{groupTitle}</h4>
                      </div>
                  )
                })
            }
        </div>
    )
}

export default ListGroups;