import React, {useEffect, useRef, useState} from "react";
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

interface VideoPlayerProps {
  url: string
  timestamp: number | null;
}

export const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = ({url, timestamp}) => {
  const parsedUrl = new URL(url);
  const videoId = parsedUrl.searchParams.get('v') || '';
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  useEffect(() => {
    if (player === null || timestamp === null) return;

    player.seekTo(timestamp, true)
    player.playVideo()
  }, [player, timestamp]);

  const opts = {
    playerVars: {},
  };

  const onReady = (event: {target: YouTubePlayer}) => {
    setPlayer(event.target);
  }

  return (
    <div className='youtube-player'>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  )
}