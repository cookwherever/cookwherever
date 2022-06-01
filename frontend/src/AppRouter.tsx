// src/AppRouter.tsx

import React, {FunctionComponent, Suspense, useContext, useEffect, useRef, useState} from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Bookmark, List, Lock } from '@mui/icons-material';
import { Container, Nav } from 'react-bootstrap';
import RecoilizeDebugger from 'recoilize';
import { ViewIngredientPage } from './pages/ViewIngredientPage/ViewIngredientPage';
import { SearchIngredientPage } from './pages/SearchIngredientPage/SearchIngredientPage';
import { SaveRecipePage } from './pages/SaveRecipePage/SaveRecipePage';
import { HomePage } from './pages/HomePage/HomePage';
import { ViewRecipePage } from './pages/ViewRecipePage/ViewRecipePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RecipeListsPage } from './pages/RecipeListsPage/RecipeListsPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'src/styles/main.css';

import RecipeVisualizerPage from './pages/RecipeVisualizerPage/RecipeVisualizerPage';
import { anonymousSignin, getRefreshedToken } from './utils/auth';
import {AuthContext, AuthProvider} from "./providers/AuthProvider";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const unauthedRoutes = (
    <>
      <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
    </>
  );
  const authedRoutes = (
    <>
      <Nav.Item>
        <Nav.Link href="/recipe/save">Save Recipe</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/lists">Lists</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <div className="pt-2">{user && (user.displayName || user.email)}</div>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}>
          Logout
        </Nav.Link>
      </Nav.Item>
    </>
  );
  return (
    <Container>
      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        {user ? authedRoutes : unauthedRoutes}
      </Nav>
    </Container>
  );
}

const AppRouter: FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <NavBar/>
          <RecoilRoot>
            <RecoilizeDebugger />
            <Suspense fallback={<span>Loading...</span>}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/ingredient/:id" component={ViewIngredientPage} />
                <Route path="/ingredient/search" component={SearchIngredientPage} />
                <Route path="/recipe/save" component={SaveRecipePage} />
                <Route path="/recipe/visualize" component={RecipeVisualizerPage} />
                <Route path="/recipe/:slug" component={ViewRecipePage} />
                <Route path="/lists" component={RecipeListsPage} />
              </Switch>
            </Suspense>
          </RecoilRoot>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  )
}

/*
// TODO EE: To replace Recoil with Redux Toolkit;

import { Provider } from 'react-redux'
import store from './redux/store'

<Router>
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </Provider>
</Router>

 */

/*

// TODO: EE: Without Recoil or Redux Toolkit;

// src/AppRouter.tsx

import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'

const AppRouter: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  )
}

 */

export default AppRouter
