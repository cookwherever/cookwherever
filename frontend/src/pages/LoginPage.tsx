import React, { useState } from 'react'

import { Container, Row } from 'react-bootstrap';
import { Login } from '../components/auth/Login';

interface LoginPageProps {

}

export const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  return (
    <Container>
      <Row>
        <h1>Login</h1>
        <Login />
      </Row>
    </Container>
  );
}
