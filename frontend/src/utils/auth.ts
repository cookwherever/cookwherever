
export const authUrl = process.env.REACT_APP_AUTH_URL || 'http://localhost:4000';

export const getRefreshedToken = async (refreshToken: string): Promise<void> => {
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

  const data = await resp.json() as {accessToken: string, user: {email: string}}
  localStorage.setItem('token', data.accessToken);
}
