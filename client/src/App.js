import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { MessageProvider } from './utils/messagecontext';
import { AuthProvider } from './utils/auth';
import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NoMatch from './pages/NoMatch';
import Chat from './pages/Chat/Chat';
import { setContext } from '@apollo/client/link/context';
import DynamicRoute from './utils/DynamicRoute';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// import ApolloProvider from './Apolloprovider';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
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
      <AuthProvider>
        <MessageProvider>
          <Header />
          <Router>
            <Switch>
              <DynamicRoute exact path="/" component={Home} guest />
              <DynamicRoute exact path="/login" component={Login} guest />
              <DynamicRoute exact path="/signup" component={Signup} guest />
              <DynamicRoute exact path="/chat" component={Chat} authenticated />
              <DynamicRoute component={NoMatch} guest />
            </Switch>
          </Router>
          <Footer />
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider >
  );
}

export default App;