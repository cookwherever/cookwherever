import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';
import path from 'path';
import { inputChangeHandler } from '../../utils/hook-helpers';
import { authUrl } from 'src/utils/auth';
import {Button, Col, Container, FormControl, FormGroup, Row} from "react-bootstrap";

interface LoginPageProps {

}

export const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const resp = await fetch(`${authUrl}/signin/email-password`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })

    if (!resp.ok) {
      throw new Error('login did no succeed');
    }

    const data = await resp.json() as {session: {accessToken: string, user: {email: string}}}
    localStorage.setItem('token', data.session.accessToken);
    localStorage.setItem('loginType', 'email-password');
    history.push('/')
  }

  const loginWithGoogle = () => {
    window.location.href = `${authUrl}/signin/provider/google?redirectTo=${process.env.REACT_APP_AUTH_REDIRECT}`;
  }

  return (
    <Container>
      <Row>
        <FormGroup>
          <FormControl onChange={inputChangeHandler(setEmail)} id="email" type="email" />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <FormControl onChange={inputChangeHandler(setPassword)} id="password" type="password" />
        </FormGroup>
      </Row>
      <Row>
        <Col>
          <Button onClick={login}>Login</Button>
        </Col>
        <Col>
          <Button onClick={loginWithGoogle}>Login with Google</Button>
        </Col>
      </Row>
    </Container>
  );
}
