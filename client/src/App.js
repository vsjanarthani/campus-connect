import React, { useState } from 'react';
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

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
	const [theme, setTheme] = useState('blue');

	const toggle = () => {
		if (theme === 'blue') {
			setTheme('green');
		} else if (theme === 'green') {
			setTheme('blue');
		}
	};

	const useStyles = makeStyles({
		root: {
			backgroundColor: theme,
			height: '30px',
			width: '30px'
		}
	});

	const classes = useStyles();

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
			<Button onClick={toggle} variant="contained">
				Click me!
			</Button>
			<div className={classes.root}></div>
			<Footer />
		</ApolloProvider>
	);
}

export default App;
