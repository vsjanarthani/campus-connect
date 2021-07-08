import React from 'react';
import './animations.css';
import { useAuthState } from '../../utils/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';
import appreciationData from './appreciationData';
import Appreciate from './card';

const Home = props => {
	const useStyles = makeStyles(_theme => ({
		celebrate: {
			marginTop: '50%'
		},
		root: {
			flexGrow: 1,
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap'
		},
		slide: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '40%',
			'@media (max-width:600px)': {
				width: '100%'
			}
		},
		title: {
			color: '#003262',
			textAlign: 'center',
			fontVariant: 'small-caps',
			padding: '1rem',

		}
	}));

	const classes = useStyles();

	const { user } = useAuthState();
	console.log(user);
	const appreciations = appreciationData.appreciation;
	return (
		<div>
			{!user ? (
				<>
					<Typography variant="h2" className="bounce-in">
						Its Graduation Day!!
					</Typography>
					<Container maxWidth="sm">
						Congratulations to all of you for successfully completing the coding
						bootcamp. It was a challenging journey for all of us. Sign up and
						join campus connect to stay in touch with cohort and TAs.
					</Container>
				</>
			) : (
				<>
					{' '}
					<Typography variant="h4" className={classes.title}>{user.data.username}'s Dashboard</Typography>{' '}
					<div className={classes.root}>

						{appreciations.map(appreciation => {
							return (
								<div className={classes.slide} key={appreciation.title}>
									<Appreciate
										imageUrl={appreciation.imageUrl}
										to={appreciation.to}
										message={appreciation.message}
										from={appreciation.from}
									/>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
