import React, { useEffect, useState } from 'react';
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
import Onboard from './components/Onboard';
import Chat from './pages/Chat/Chat';
// import { setContext } from '@apollo/client/link/context';
import DynamicRoute from './utils/DynamicRoute';
// import {
// 	ApolloClient,
// 	InMemoryCache,
// 	ApolloProvider,
// 	createHttpLink
// } from '@apollo/client';

// theme stuff
import { makeStyles } from '@material-ui/core/styles';
import { workTheme, funTheme } from './utils/themes';

import ApolloProvider from './Apolloprovider';
// const httpLink = createHttpLink({
// 	uri: 'http://localhost:3001/graphql'
// });
// const authLink = setContext((_, { headers }) => {
// 	const token = localStorage.getItem('token');
// 	console.log({ token });
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : ''
// 		}
// 	};
// });
// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache()
// });

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
		<ApolloProvider
		// client={client}
		>
			<AuthProvider>
				<MessageProvider>
					<Header
						onChange={value => setThemeToggle(value)}
						data={currentTheme}
					/>
					<Router>
						<Switch>
							<DynamicRoute
								exact
								path="/"
								component={() => <Home data={currentTheme} />}
								guest
							/>
							<DynamicRoute exact path="/login" component={Login} guest />
							<DynamicRoute exact path="/signup" component={Signup} guest />
							<DynamicRoute exact path="/onboard" component={Onboard} />
							<DynamicRoute exact path="/chat" component={Chat} authenticated />
							<DynamicRoute component={NoMatch} guest />
						</Switch>
					</Router>
					<Footer data={currentTheme} />
				</MessageProvider>
			</AuthProvider>
		</ApolloProvider>
	);
}

export default App;
