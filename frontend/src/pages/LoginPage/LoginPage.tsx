import React, { useState } from 'react'
import './LoginPage.scss'
import {Button, Grid, Paper, styled, TextField} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Face, Fingerprint } from '@material-ui/icons';
import { inputChangeHandler } from '../../util/hook-helpers';
import path from "path";

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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;
    if (!authUrl) {
      throw new Error('auth url is not set!');
    }

    const resp = await fetch(path.join(authUrl, '/signin/email-password'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    })

    const data = await resp.json() as {id: string, username: string, token: string}
    localStorage.setItem('token', data.token)
    history.push('/')
  }

  return (
    <LoginPaper>
      <LoginContent>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField onChange={inputChangeHandler(setUsername)} id="username" label="Username" type="email" fullWidth autoFocus required />
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
      </LoginContent>
    </LoginPaper>
  );
}
