import React from 'react';
import {Channel} from "../../App";
import Hls from "hls.js";
import ReactPlayer from "react-player";

interface ViewChannelProps {
    channel: Channel;
    onBack: () => void;
}

function ViewChannel ({ channel, onBack } : ViewChannelProps): JSX.Element {
    const video = React.createRef<any>();

    React.useEffect(() => {
        if (video.current && Hls.isSupported()) {
            const hlsConfig: Partial<Hls.Config> = {
                maxBufferSize: 0,
                maxBufferLength: 30,
                liveSyncDuration: -1,
                debug: true,
            }

            const hls = new Hls(hlsConfig);
            hls.loadSource(channel.url);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                console.log('manifest parsed')
                video.current?.play();
            })
        }
        // if (video.current) {
        //     console.log('readMSE')
        //     readMse(video.current, channel.url);
        // }
    }, [channel, video])

    return (
        <div className="channel-info">
            <button className="go-back" onClick={onBack}> Voltar </button>
            <h1>{channel.inf.title}</h1>
            <h2>{channel.inf.groupTitle}</h2><br/>
            <ReactPlayer ref={video} url={channel.url} width={"100%"} height={500} controls playing/>
        </div>
    )
}

export default ViewChannel