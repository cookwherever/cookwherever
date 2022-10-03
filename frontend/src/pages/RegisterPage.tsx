import React, { useState } from 'react'

import {Button, Grid, Paper, styled, TextField} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Face, Fingerprint } from '@material-ui/icons';
import path from 'path';
import { inputChangeHandler } from '../utils/hook-helpers';

const RegisterPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing() * 2
}));

const RegisterContent = styled('div')(({ theme }) => ({
  padding: theme.spacing()
}));

interface LoginPageProps {

}

export const RegisterPage: React.FunctionComponent<LoginPageProps> = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;
    if (!authUrl) {
      throw new Error('auth url is not set!');
    }

    const resp = await fetch(`${authUrl}/signup/email-password`, {
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

    const data = await resp.json() as {id: string, username: string, token: string}
    localStorage.setItem('token', data.token)
    history.push('/')
  }

  return (
    <RegisterPaper>
      <RegisterContent>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField onChange={inputChangeHandler(setEmail)} id="username" label="Email" type="email" fullWidth autoFocus required />
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
          <Button onClick={login} variant="outlined" color="primary" style={{ textTransform: 'none' }}>Register</Button>
        </Grid>
      </RegisterContent>
    </RegisterPaper>
  );
}
