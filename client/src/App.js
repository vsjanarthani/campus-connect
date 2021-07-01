import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import { LogoProvider } from './utils/GlobalState';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

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
      <Header />
      <Router>
        <div>
          <LogoProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/* <Route exact path="/chat" component={Chat} /> */}
              <Route component={NoMatch} />
            </Switch>
          </LogoProvider>
        </div>

      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
