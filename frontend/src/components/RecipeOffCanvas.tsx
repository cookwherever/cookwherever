import React, { useState } from 'react';
import { Button, Col, Container, Form, Offcanvas, Row } from 'react-bootstrap';
import { Recipes } from '../generated/graphql';
import { SaveRecipeToList } from './SaveRecipeToList';
import { ToggleRecipeVisible } from './ToggleRecipeVisible';
import { useRecoilState } from 'recoil';
import { viewModeState } from '../recoil/atoms/auth';

interface RecipeOffCanvasProps {
  recipe: Recipes
  visible: boolean
  callbacks: {
    show: React.Dispatch<boolean>
  }
}

interface ViewModeSelectorProps {

}

const ViewModeSelector: React.FunctionComponent<ViewModeSelectorProps> = ({}) => {
  const [viewMode, setViewMode] = useRecoilState(viewModeState);

  const toggleDeveloperMode = () => {
    setViewMode(viewMode === 'developer' ? 'view' : 'developer')
  }

  return (
    <>
      <Form.Check
        type="switch"
        label="developer"
        checked={viewMode === 'developer'}
        onChange={toggleDeveloperMode}
      />
    </>
  )
}

export const RecipeOffCanvas: React.FunctionComponent<RecipeOffCanvasProps> = ({ recipe, visible, callbacks: { show } }) => {
  const printRecipe = () => {
    const url = 'https://hass.vanderpot.net/api/webhook/qW60QVQzUzzBdRd4rj79mWR3HK2Oxu4d';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <>
      <Offcanvas placement='bottom' show={visible} onHide={() => {show(false)}}>
        <Container>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Recipe Actions</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form>
              <Row>
                <Col md={4}>
                  <ViewModeSelector />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formPrint">
                    <Form.Label>Print Recipe</Form.Label>
                    <Button size="sm" onClick={printRecipe}>Print</Button>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formHide">
                    <Form.Label>Toggle Recipe as Visible</Form.Label>
                    <ToggleRecipeVisible recipe={recipe} />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </>
  );
}
