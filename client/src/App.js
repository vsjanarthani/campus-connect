import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NoMatch from './pages/NoMatch';
import Chat from './pages/Chat/Chat';

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
	const [toggle, setToggle] = useState(false);

	const toggleHandler = value => {
		console.log(value);
		setToggle(value);
	};

	return (
		<ApolloProvider client={client}>
			<Header onChange={value => toggleHandler(value)} />
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
