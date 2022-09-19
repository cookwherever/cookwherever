import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';
import path from 'path';
import { authUrl } from 'src/utils/auth';
import { Button, Col, Container, FormControl, FormGroup, Row } from 'react-bootstrap';
import { inputChangeHandler } from '../../utils/hook-helpers';
import { Login } from '../../components/auth/Login';

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
