import React, { ChangeEvent, useEffect, useState } from 'react';
import { Col, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Recipe_Directions, Recipes, useUpsertDirectionVideoTimestampMutation } from '../generated/graphql';
import { inDeveloperMode } from '../recoil/selectors/view-mode';
import {
  recipeViewerState,
  TimestampPosition
} from '../recoil/atoms/recipe';
import { Span } from './Annotator/span';
import { TextAnnotator } from './Annotator/TextAnnotator';
import { parseDuration } from '../utils/parse-duration';
import {uuid} from "../utils/uuid";

const INSERT_DIRECTION_VIDEO_TIMESTAMP = gql`
mutation UpsertDirectionVideoTimestamp($video_timestamp: Int, $video_timestamp_end: Int, $id: Int) {
  update_recipe_directions(where: {id: {_eq: $id}}, _set: {video_timestamp: $video_timestamp, video_timestamp_end: $video_timestamp_end}) {
    affected_rows
  }
}
`

interface RecipeDirectionsProps {
  recipe: Recipes
  showStepNumbers: boolean
}

interface RecipeDirectionRowProps {
  idx: number
  direction: Recipe_Directions
  goToTimestamp: () => void
  showStepNumbers: boolean
}


const RecipeDirectionRow: React.FunctionComponent<RecipeDirectionRowProps> = ({
  idx,
  direction,
  goToTimestamp,
  showStepNumbers
}) => {
  const developerMode = useRecoilValue(inDeveloperMode);
  const [recipeState, setRecipeState] = useRecoilState(recipeViewerState);
  const { focusedDirectionTimestamp, reportedTimestamp } = recipeState;

  const [upsertDirectionVideoTimestampMutation, { data, loading, error }] = useUpsertDirectionVideoTimestampMutation();

  const getDirectionStepWidth = () => {
    if (developerMode) return 11;
    if (direction.video_timestamp) return 11;
    return 12;
  };

  const seekToVideoButton = (
    <Col md={1}>
      <div className='fs-3' onClick={goToTimestamp}><i style={{ cursor: 'pointer' }} className='bi bi-play-circle' /></div>
    </Col>
  );

  const stepNumber = showStepNumbers ? `${idx + 1}.` : '';

  const [annotatorState, setAnnotatorState] = useState<Span[]>([]);

  useEffect(() => {
    const regex = /(\d+|\d+ to \d+)\s(seconds?|minutes?|hours?|days?)/g

    const annotatorValue: Span[] = [];

    while (true) {
      const match = regex.exec(direction.step);
      if (!match) break;

      console.log(match);

      const startIdx = regex.lastIndex - match[0].length;
      const endIdx = regex.lastIndex;

      annotatorValue.push({
        start: startIdx,
        end: endIdx,
        tag: 'time'
      })
    }
    setAnnotatorState(annotatorValue);
  }, [direction])

  const directionStep = (
    <Row>
      <Col className='fs-5' md={getDirectionStepWidth()}>
        {/* <Highlighter searchWords={ingredientNames} textToHighlight={direction.step} autoEscape={false} /> */}
        { stepNumber }
        <TextAnnotator
          content={direction.step}
          value={annotatorState}
          onAnnotatorChange={value => setAnnotatorState(value)}
          highlightClicked={(s) => {
            const duration = parseDuration(s);
            setRecipeState({
              ...recipeState,
              timers: [
                ...recipeState.timers,
                {
                  id: uuid(),
                  stepNumber: idx + 1,
                  time: duration
                }
              ]
            })
          }}
          getSpan={span => ({
            ...span,
            tag: 'time',
            color: '#84d2ff',
          })}
        />
      </Col>
      {direction.video_timestamp && seekToVideoButton}
    </Row>
  );

  const timestamp = direction.video_timestamp;
  const timestampEnd = direction.video_timestamp_end;

  function additionalDirectionContent() {
    const clipStart = timestamp ? `${Math.floor(timestamp / 60)}:${`00${timestamp % 60}`.slice(-2)}` : '';
    const clipEnd = timestampEnd ? `${Math.floor(timestampEnd / 60)}:${`00${timestampEnd % 60}`.slice(-2)}` : '';

    const changeTimestamp = (position: TimestampPosition) => async (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
      const parseTimestamp = () => {
        let errs = '';
        try {
          return parseInt(event.target.value, 10);
        } catch (e) {
          errs += e;
          console.log('timestamp is not represented as seconds');
        }

        try {
          const timestampParts = event.target.value.split(':');
          const minutes = parseInt(timestampParts[0], 10);
          const seconds = parseInt(timestampParts[1], 10);
          return minutes * 60 + seconds;
        } catch (e) {
          errs += e;
          console.log('timestamp is not represented as minutes:seconds');
        }

        throw new Error(errs);
      }

      const parsedTimestamp = parseTimestamp();

      await upsertDirectionVideoTimestampMutation({
        variables: {
          id: direction.id,
          video_timestamp: position === 'start' ? parsedTimestamp : timestamp,
          video_timestamp_end: position === 'end' ? parsedTimestamp : timestampEnd,
        },
      })

      setRecipeState({
        ...recipeState,
        invalidated: true,
      })
    }

    const setFocusedInput = (position: TimestampPosition) => (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
      setRecipeState({
        ...recipeState,
        focusedDirectionTimestamp: {
          idx,
          position,
        }
      })
    }

    const isFocusedInput = (position: TimestampPosition) => {
      return focusedDirectionTimestamp.idx === idx && focusedDirectionTimestamp.position === position;
    }

    const developerMenu = (
      <Row>
        <Col md={{ span: 3, offset: 6 }}>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={isFocusedInput('start') ? 'btn-primary' : ''}
              style={{ cursor: 'pointer' }}
            >
              start
            </InputGroup.Text>
            <FormControl
              value={clipStart}
              onFocus={setFocusedInput('start')}
              onChange={changeTimestamp('start')}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={isFocusedInput('end') ? 'btn-primary' : ''}
              style={{ cursor: 'pointer' }}
            >
              end
            </InputGroup.Text>
            <FormControl
              value={clipEnd}
              onFocus={setFocusedInput('end')}
              onChange={changeTimestamp('end')}
            />
          </InputGroup>
        </Col>
      </Row>
    );

    if (developerMode) {
      return developerMenu;
    }

    return null;
  }

  return (
    <>
      {directionStep}
      {additionalDirectionContent()}
    </>
  )
}

export const RecipeDirections: React.FunctionComponent<RecipeDirectionsProps> = (
  {
    recipe,
    showStepNumbers
  }) => {
  const [currentDirection, setCurrentDirection] = useState<number | null>(null);
  const [recipeState, setRecipeState] = useRecoilState(recipeViewerState);

  return (
    <ListGroup>
      {recipe.recipe_directions.map((direction, idx) => {

        const goToTimestamp = () => {
          if (!direction.video_timestamp) return;
          setRecipeState({
            ...recipeState,
            currentRecipeStep: {
              timestamp: direction.video_timestamp,
              timestampEnd: direction.video_timestamp_end || undefined
            }
          });
        }

        return (
          <ListGroup.Item
            key={direction.id}
            className={['recipe-direction', direction.id === currentDirection ? 'recipe-direction-current' : ''].join(' ')}
            onClick={() => {
              setCurrentDirection(direction.id);
            }}
          >
            <Row>
              <RecipeDirectionRow
                idx={idx}
                direction={direction}
                goToTimestamp={goToTimestamp}
                showStepNumbers={showStepNumbers}
              />
            </Row>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}