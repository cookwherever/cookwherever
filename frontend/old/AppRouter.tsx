// src/AppRouter.tsx

import React, { FunctionComponent, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Container, Nav } from 'react-bootstrap';
import RecoilizeDebugger from 'recoilize';
import { Provider } from 'react-redux';
import { Save } from './pages/recipe/Save';
import { LoginPage } from '../old/pages/LoginPage';
import { RegisterPage } from '../old/pages/RegisterPage';

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'old/styles/main.css';

import { logout, selectSession } from '../old/recoil/authentication';
import { useAppSelector } from '../old/hooks/useAppSelector';
import useAppDispatch from '../old/hooks/useAppDispatch';
import { store } from '../old/recoil/store';
import { LoadSession } from '../old/components/auth/LoadSession';
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import { RelayEnvironment } from './RelayEnvironment';

const NavBar = () => {
  const session = useAppSelector(selectSession);
  const history = useHistory();
  const dispatch = useAppDispatch();
  // @ts-ignore
  const doLogout = () => dispatch(logout(history));

  const authedRoutes = (
    <>
      <Nav.Item>
        <Nav.Link href="/recipe/save">Save Recipe</Nav.Link>
      </Nav.Item>
    </>
  );
  return (
    <Container>
      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        {session && authedRoutes}
        <>
          <Nav.Item>
            {session ? (
              <Nav.Link onClick={doLogout}>Log Out</Nav.Link>
            ) : (<Nav.Link href="/login">Login</Nav.Link>)}
          </Nav.Item>
        </>
      </Nav>
    </Container>
  );
}

const AppRouter: FunctionComponent = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Router>
        <Provider store={store}>
          <LoadSession>
            <RecoilRoot>
              <RecoilizeDebugger />
              <Suspense fallback={<span>Loading...</span>}>
                <NavBar />
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/recipe/save" component={Save} />
                </Switch>
              </Suspense>
            </RecoilRoot>
          </LoadSession>
        </Provider>
      </Router>
    </RelayEnvironmentProvider>
  )
}
export default AppRouter
