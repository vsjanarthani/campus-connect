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

// theme stuff
import { makeStyles } from '@material-ui/core/styles';
import { workTheme, funTheme } from './utils/themes';

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
	// theme & toggle states
	const [themeToggle, setThemeToggle] = useState(false);
	const [currentTheme, setCurrentTheme] = useState(workTheme);
	// set theme state when toggle is switched
	useEffect(() => {
		if (!themeToggle) {
			console.log('Work 💼');
			setCurrentTheme(workTheme);
		} else {
			console.log('After hours 🍸');
			setCurrentTheme(funTheme);
		}
	}, [themeToggle]);

	useEffect(() => {
		console.log(currentTheme);
	}, [currentTheme]);

	const useStyles = makeStyles({
		testBox: {
			backgroundColor: currentTheme.testColor,
			height: '300px',
			width: '300px'
		}
	});

	const classes = useStyles();

	return (
		<ApolloProvider client={client}>
			<Header onChange={value => setThemeToggle(value)} />
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
