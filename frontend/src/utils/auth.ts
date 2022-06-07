import { User } from '../types/user';

export const authUrl = process.env.REACT_APP_AUTH_URL || 'http://localhost:4000';

export const getRefreshedToken = async (refreshToken: string): Promise<User | null> => {
  const resp = await fetch(`${authUrl}/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'refreshToken': refreshToken,
    })
  })

  if (!resp.ok) {
    throw new Error('unable to refresh token');
  }

  const data = await resp.json() as {accessToken: string, user: User}
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('loginType', 'oauth');
  return data.user;
}

export const getUserInfo = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const resp = await fetch(`${authUrl}/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
  })

  if (!resp.ok) {
    throw new Error('unable to get user');
  }
  return await resp.json() as User;
}

export const anonymousSignin = async (): Promise<void> => {
  const resp = await fetch(`${authUrl}/signin/anonymous`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })

  if (!resp.ok) {
    throw new Error('unable to sign in anonymously');
  }

  const data = await resp.json() as {accessToken: string, user: {email: string}}
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('loginType', 'anonymous');
}
