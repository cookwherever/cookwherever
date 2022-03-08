import React, { useState } from 'react';
import {Button, Col, Container, Form, Offcanvas, Row} from 'react-bootstrap';
import { Recipes } from '../generated/graphql';
import {SaveRecipeToList} from "./SaveRecipeToList";
import {ToggleRecipeVisible} from "./ToggleRecipeVisible";

interface RecipeOffCanvasProps {
  recipe: Recipes
  visible: boolean
  callbacks: {
    show: React.Dispatch<boolean>
  }
}

export const RecipeOffCanvas: React.FunctionComponent<RecipeOffCanvasProps> = ({ recipe, visible, callbacks: { show } }) => {
  const printRecipe = () => {
    const url = 'https://hass.vanderpot.net/api/webhook/qW60QVQzUzzBdRd4rj79mWR3HK2Oxu4d';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json'
      }
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
                <Col md={8}>
                  <Form.Group controlId="formSaveToList">
                    <Form.Label>Save Recipe to List</Form.Label>
                    <SaveRecipeToList recipe={recipe} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <Form.Group controlId="formPrint">
                    <Form.Label>Print Recipe</Form.Label>
                    <Button size="sm" onClick={printRecipe}>Print</Button>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
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
