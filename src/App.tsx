import './app.style.scss';

import React from 'react';
import axios from "axios";
import M3U8FileParser from 'm3u8-file-parser';
import ListChannels from "./components/ListChannels/ListChannels";
import ListGroups from "./components/ListGroups/ListGroups";
import ViewChannel from "./components/ViewChannel/ViewChannel";

enum Pages {
  GROUPS, CHANNELS_OF_GROUP, CHANNEL,
}

export interface ChannelInfo {
  duration: number;
  groupTitle: string;
  title: string;
  tvgLogo: string;
}

export interface Channel {
  url: string;
  inf: ChannelInfo;
}

export interface PageState {
  page: Pages;
  group?: string;
  channel?: Channel;
}

const pageInitial = {
  page: Pages.GROUPS,
  group: '',
  channel: undefined
}

function App() {
  const [pageInfo, setPageInfo] = React.useState<PageState>(pageInitial);
  const [channels, setChannels] = React.useState<Channel[]>([]);

  const loadList = () => {
    axios.get('/tv-channels.m3u').then(res => {
      const reader = new M3U8FileParser();
      reader.read(res.data);
      const result = reader.getResult();
      setChannels(result.segments);
    }).catch(err => {
      console.error(err.response);
    })
  }

  React.useEffect(() => {
    loadList();
  }, []);

  function onChoiceGroup(groupName: string) {
    setPageInfo({
      ...pageInitial,
      page: Pages.CHANNELS_OF_GROUP,
      group: groupName,
    })
  }

  function onChoiceChannel(channel: Channel) {
    setPageInfo({
      ...pageInfo,
      page: Pages.CHANNEL,
      channel: channel,
    })
  }

  function onBackToGroups() {
    setPageInfo(pageInitial)
  }

  function onBackToChannelsOfGroup() {
    setPageInfo({
      group: pageInfo.group,
      page: Pages.CHANNELS_OF_GROUP,
      channel: undefined
    })
  }

  return (
    <div className="App">
      {
        pageInfo.page === Pages.GROUPS &&
        <ListGroups channels={channels} onSelect={onChoiceGroup}/>
      }
      {
        pageInfo.page === Pages.CHANNELS_OF_GROUP &&
        <ListChannels channels={channels} groupName={pageInfo.group} onSelect={onChoiceChannel} onBack={onBackToGroups}/>
      }
      {
        pageInfo.page === Pages.CHANNEL && pageInfo.channel &&
        <ViewChannel channel={pageInfo.channel} onBack={onBackToChannelsOfGroup}/>
      }
    </div>
  );
}

export default App;
