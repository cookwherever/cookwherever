import React, { useState } from 'react'

import { Button, Grid, Paper, styled, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Face, Fingerprint } from '@material-ui/icons';
import path from 'path';
import { inputChangeHandler } from '../../utils/hook-helpers';
import { authUrl } from 'src/utils/auth';

const LoginPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing() * 2
}));

const LoginContent = styled('div')(({ theme }) => ({
  padding: theme.spacing()
}));

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
    history.push('/')
  }

  const loginWithGoogle = () => {
    window.location.href = `${authUrl}/signin/provider/google`;
  }

  return (
    <LoginPaper>
      <LoginContent>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField onChange={inputChangeHandler(setEmail)} id="email" label="Email" type="email" fullWidth autoFocus required />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField onChange={inputChangeHandler(setPassword)} id="password" label="Password" type="password" fullWidth required />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button onClick={login} variant="outlined" color="primary" style={{ textTransform: 'none' }}>Login</Button>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button onClick={loginWithGoogle} variant="outlined" color="primary" style={{ textTransform: 'none' }}>Login with Google</Button>
        </Grid>
      </LoginContent>
    </LoginPaper>
  );
}
