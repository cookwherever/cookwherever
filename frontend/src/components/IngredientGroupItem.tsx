import React, {useState} from 'react';
import { Col, ListGroup, Row, Form } from 'react-bootstrap';
import { Recipe_Ingredients } from '../generated/graphql';

interface IngredientGroupItemProps {
  ingredient: Recipe_Ingredients
  callbacks: {
    setTimestamp: React.Dispatch<number>;
  }
}

export const IngredientGroupItem: React.FunctionComponent<IngredientGroupItemProps> = ({ ingredient, callbacks: {setTimestamp} }) => {
  console.log(ingredient.amount, ingredient.units);

  const [markAsPrepped, setMarkAsPrepped] = useState<boolean>(false);

  const lookup: Record<string, number> = {
    teaspoon: 1,
    tablespoon: 3,
    cup: 4 * 4 * 3,
  };

  if (ingredient.amount && ingredient.units) {
    const modifier = lookup[ingredient.units];
    const normalized = ingredient.amount / modifier;
  }

  const parsedInfo =  (<>- ({ingredient.name} {ingredient.amount} {ingredient.units})</>)

  const doSetTimestamp = () => {
    if (!ingredient.video_timestamp) return;
    setTimestamp(ingredient.video_timestamp);
  }

  const ingredientText = (<div style={markAsPrepped ? {textDecoration: 'line-through', cursor: 'pointer'} : {cursor: 'pointer'}}>{ingredient.text}</div>);

  return (
    <ListGroup.Item key={ingredient.id} onClick={() => setMarkAsPrepped(!markAsPrepped)}>
      <Row>
        {ingredient.video_timestamp ? (
          <>
            <Col md={10}>
              {ingredientText}
            </Col>
            <Col className='fs-3' md={2}>
              <div onClick={doSetTimestamp}><i style={{ cursor: 'pointer' }} className='bi bi-play-circle' /></div>
            </Col>
          </>
        ) : (
          <Col md={12}>
            {ingredientText}
          </Col>
        )}
      </Row>
    </ListGroup.Item>
  )
}
