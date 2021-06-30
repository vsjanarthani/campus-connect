import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NoMatch from './pages/NoMatch';
import Chat from './pages/Chat/Chat';
const token = window.localStorage.getItem('id_token');
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
const authLink = setContext((_, { headers }) => {

  console.log({ token })
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={Chat} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
