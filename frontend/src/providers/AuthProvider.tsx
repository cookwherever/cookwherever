import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRefreshedToken, getUserInfo } from '../utils/auth';
import { User } from '../types/user';

interface AuthProviderState {
  user: User | null
}

const initialState: AuthProviderState = {
  user: null
};

const AuthContext = React.createContext(initialState);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { hash } = useLocation();
  const [user, setUser] = useState<User | null>(null);

  const params = new URLSearchParams(hash.replace('#', ''));
  const refreshToken = params.get('refreshToken')

  useEffect(() => {
    if (refreshToken) {
      getRefreshedToken(refreshToken).then(authedUser => {
        setUser(authedUser);
      }).catch(e => {
        console.error(e);
        alert(e);
      });
    }
  }, [refreshToken])

  useEffect(() => {
    getUserInfo().then(authedUser => {
      setUser(authedUser);
    }).catch(e => {
      console.error(e);
    })
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };