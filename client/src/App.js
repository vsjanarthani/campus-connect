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
import DynamicRoute from './utils/DynamicRoute';
// theme stuff
import { makeStyles } from '@material-ui/core/styles';
import { workTheme, funTheme } from './utils/themes';
import ApolloProvider from './Apolloprovider';
import Confetti from 'react-confetti';

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
		body: {
			backgroundColor: currentTheme.background,
			minHeight: '100vh'
		},
		confetti: {
			zIndex: '-10'
		}
	});

	const classes = useStyles();

	return (
		<div className={classes.body}>
			<Confetti
				className={classes.confetti}
				numberOfPieces={currentTheme.confetti}
			/>
			<ApolloProvider>
				<AuthProvider>
					<MessageProvider>
						<Router>
							<Header
								onChange={value => setThemeToggle(value)}
								data={currentTheme}
							/>

							<Switch>
								<DynamicRoute
									exact
									path="/"
									component={() => <Home data={currentTheme} />}
									guest
								/>

								<DynamicRoute
									exact
									path="/login"
									component={() => <Login data={currentTheme} />}
									guest
								/>
								<DynamicRoute
									exact
									path="/signup"
									component={() => <Signup data={currentTheme} />}
									guest
								/>
								<DynamicRoute
									exact
									path="/onboard"
									component={() => <Onboard data={currentTheme} />}
									authenticated
								/>
								<DynamicRoute
									exact
									path="/chat"
									component={() => <Chat data={currentTheme} />}
									authenticated
								/>
								<DynamicRoute component={NoMatch} guest />
							</Switch>
						</Router>
						<Footer data={currentTheme} />
					</MessageProvider>
				</AuthProvider>
			</ApolloProvider>
		</div>
	);
}

export default App;
