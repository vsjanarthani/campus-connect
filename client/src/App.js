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
import DynamicRoute from './utils/dynamicRoute';
import { ApolloProvider, ApolloClient } from '@apollo/client';
// import ApolloProvider from './Apolloprovider';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: 'http://localhost:3001/graphql'
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
