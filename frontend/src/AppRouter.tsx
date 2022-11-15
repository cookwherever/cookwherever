// src/AppRouter.tsx

import React, { FunctionComponent, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { Button, Container, Nav } from 'react-bootstrap';
import RecoilizeDebugger from 'recoilize';
import { Provider } from 'react-redux';
import { SaveRecipePage } from './pages/SaveRecipePage';
import { HomePage } from './pages/HomePage';
import { ViewRecipePage } from './pages/ViewRecipePage';
import { LoginPage } from './pages/LoginPage';
import { RecipeListsPage } from './pages/RecipeListsPage';
import { RegisterPage } from './pages/RegisterPage';

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'src/styles/main.css';

import RecipeVisualizerPage from './pages/RecipeVisualizerPage';
import { IngredientsPage } from './pages/IngredientsPage';
import { DevicesPage } from './pages/DevicesPage';
import { logout, selectSession } from './recoil/authentication';
import { useAppSelector } from './hooks/useAppSelector';
import useAppDispatch from './hooks/useAppDispatch';
import { store } from './recoil/store';
import { LoadSession } from './components/auth/LoadSession';
import { env } from './env';

const httpLink = createHttpLink({
  uri: env.GRAPHQL_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

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
      <Nav.Item>
        <Nav.Link href="/lists">Lists</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/ingredient">Ingredients</Nav.Link>
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
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <LoadSession>
            <RecoilRoot>
              <RecoilizeDebugger />
              <Suspense fallback={<span>Loading...</span>}>
                <NavBar />
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/ingredient" component={IngredientsPage} />
                  <Route path="/recipe/save" component={SaveRecipePage} />
                  <Route path="/recipe/visualize" component={RecipeVisualizerPage} />
                  <Route path="/recipe/:slug" component={ViewRecipePage} />
                  <Route path="/lists" component={RecipeListsPage} />
                  <Route path="/devices" component={DevicesPage} />
                </Switch>
              </Suspense>
            </RecoilRoot>
          </LoadSession>
        </Provider>
      </Router>
    </ApolloProvider>
  )
}
export default AppRouter
