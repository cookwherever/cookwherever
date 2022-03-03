// src/AppRouter.tsx

import React, {FunctionComponent, Suspense, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Link, Route, Switch, useHistory, useLocation} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Bookmark, List, Lock } from '@mui/icons-material';
import { ViewIngredientPage } from './pages/ViewIngredientPage/ViewIngredientPage';
import { SearchIngredientPage } from './pages/SearchIngredientPage/SearchIngredientPage';
import { SaveRecipePage } from './pages/SaveRecipePage/SaveRecipePage';
import { HomePage } from './pages/HomePage/HomePage';
import { ViewRecipePage } from './pages/ViewRecipePage/ViewRecipePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RecipeListsPage } from './pages/RecipeListsPage/RecipeListsPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

import 'bootstrap/dist/css/bootstrap.css';
import 'src/styles/main.css';

import RecipeVisualizerPage from "./pages/RecipeVisualizerPage/RecipeVisualizerPage";
import {getRefreshedToken} from "./utils/auth";

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const AppRouter: FunctionComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <ApolloProvider client={client}>
      <Router>
        <RecoilRoot>
          <Suspense fallback={<span>Loading...</span>}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/ingredient/:id" component={ViewIngredientPage} />
              <Route path="/ingredient/search" component={SearchIngredientPage} />
              <Route path="/recipe/save" component={SaveRecipePage} />
              <Route path="/recipe/visualize" component={RecipeVisualizerPage} />
              <Route path="/recipe/:id" component={ViewRecipePage} />
              <Route path="/lists" component={RecipeListsPage} />
            </Switch>
          </Suspense>
        </RecoilRoot>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<Home />} />
            <BottomNavigationAction component={Link} to="/recipe/save" label="Save Recipe" icon={<Bookmark />} />
            <BottomNavigationAction component={Link} to="/lists" label="Lists" icon={<List />} />
            <BottomNavigationAction component={Link} to="/login" label="Login" icon={<Lock />} />
          </BottomNavigation>
        </Paper>
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
