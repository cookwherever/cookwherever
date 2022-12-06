import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Button } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inDeveloperMode } from '../recoil/selectors/view-mode';
import { FocusedDirectionTimestamp, initialFocusedDirectionTimestamp, recipeViewerState } from '../recoil/atoms/recipe';
import {
  Recipes, RecipesQueryDocument,
  UpsertDirectionVideoTimestampDocument,
  useUpsertDirectionVideoTimestampMutation,
} from '../generated/graphql.tsx.bak';

interface VideoPlayerProps {
  recipe: Recipes;
}

export const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = ({ recipe }) => {
  const parsedUrl = new URL(recipe.video || '');
  const videoId = parsedUrl.searchParams.get('v') || '';

  const [recipeState, setRecipeState] = useRecoilState(recipeViewerState);
  const { currentRecipeStep } = recipeState;

  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const developerMode = useRecoilValue(inDeveloperMode);
  const { focusedDirectionTimestamp } = recipeState;

  const [upsertDirectionVideoTimestampMutation, { data, loading, error }] = useUpsertDirectionVideoTimestampMutation();

  useEffect(() => {
    if (player === null || !currentRecipeStep) return;

    const { timestamp, timestampEnd } = currentRecipeStep;

    if (!timestamp) return;

    console.log(`seeking video to ${currentRecipeStep}`)
    player.seekTo(timestamp, true)
    player.playVideo()

    if (!timestampEnd) return;

    console.log(`playing video for ${(timestampEnd - timestamp) * 1000}`)

    setTimeout(() => {
      console.log('pausing video')
      player.pauseVideo()
    }, (timestampEnd - timestamp) * 1000)
  }, [player, currentRecipeStep]);

  const opts = {
    playerVars: {},
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
  }

  const changeTimestamp = async () => {
    if (player === null) return;

    const currentTime = await player.getCurrentTime();
    const updatedTimestamp = Math.floor(currentTime);

    const getNextFocusedDirectionTimestamp = (): FocusedDirectionTimestamp => {
      if (focusedDirectionTimestamp.position === 'start') {
        return {
          idx: focusedDirectionTimestamp.idx,
          position: 'end',
        }
      }

      if (focusedDirectionTimestamp.idx + 1 < recipe.recipe_directions.length) {
        return {
          idx: focusedDirectionTimestamp.idx + 1,
          position: 'start',
        }
      }
      return initialFocusedDirectionTimestamp;
    }

    const getFocusedDirection = () => {
      const directions = recipe.recipe_directions.filter((d, idx) => idx === focusedDirectionTimestamp.idx);
      if (directions.length !== 1) {
        throw new Error(`filtered directions for focused timestamp did not return exactly one result: ${directions}`);
      }
      return directions[0];
    }

    const focusedDirection = getFocusedDirection();

    await upsertDirectionVideoTimestampMutation({
      variables: {
        id: focusedDirection.id,
        video_timestamp: focusedDirectionTimestamp.position === 'start' ? updatedTimestamp : focusedDirection.video_timestamp,
        video_timestamp_end: focusedDirectionTimestamp.position === 'end' ? updatedTimestamp : focusedDirection.video_timestamp_end,
      },
    })

    setRecipeState({
      ...recipeState,
      invalidated: true,
      reportedTimestamp: updatedTimestamp,
      focusedDirectionTimestamp: getNextFocusedDirectionTimestamp(),
    })

  }

  return (
    <div className='youtube-player' style={{ position: 'fixed' }}>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} onStateChange={(event) => {console.log(event)}} />
      { developerMode && <Button onClick={changeTimestamp}>Set Timestamp</Button> }
    </div>
  )
}
