import React, {useState} from "react";
import {Col, ListGroup, Row} from "react-bootstrap";
import {Recipes} from "../generated/graphql";

interface RecipeDirectionsProps {
  recipe: Recipes
  callbacks: {
    setTimestamp: React.Dispatch<number>
  }
}

export const RecipeDirections: React.FunctionComponent<RecipeDirectionsProps> = (
  {
    recipe,
    callbacks: {
      setTimestamp
    }
  }) => {
  const [currentDirection, setCurrentDirection] = useState<number | null>(null);
  return (
    <ListGroup>
      {recipe.recipe_directions.map((direction, idx) => {
        const goToTimestamp = () => {
          if (!direction.video_timestamp) return;
          setTimestamp(direction.video_timestamp);
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
              <Col className='fs-5' md={11}>
                {/* <Highlighter searchWords={ingredientNames} textToHighlight={direction.step} autoEscape={false} /> */}
                <p>{direction.step}</p>
              </Col>
              <Col md={1}>
                {direction.video_timestamp && <div className='fs-3' onClick={goToTimestamp}><i style={{ cursor: 'pointer' }} className='bi bi-play-circle' /></div>}
              </Col>
            </Row>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}