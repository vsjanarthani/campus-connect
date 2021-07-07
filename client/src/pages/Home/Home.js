import React from 'react';
import './animations.css';
import { useAuthState } from '../../utils/auth';
import { Typography, Container } from '@material-ui/core';

const Home = props => {
	// 	const useStyles = makeStyles((theme) => {
	// 		celebrate: {
	// 			marginTop: '50%'
	// 		}
	// 	});
	//
	// 	const classes = useStyles();

	const { user } = useAuthState();
	console.log(user);
	return (
		<div>
			{!user ? (
				<>
					<Typography variant="h2" className="bounce-in">
						Its Graduation Day!!
					</Typography>
					<Container maxWidth="sm">
						Congratulations to all of you for successfully completing the coding bootcamp. It was a challenging journey for all of us. Sign up and join campus connect to stay in touch
						with cohort and TAs.

					</Container>
				</>
			) : (
				<>
					{' '}
					<Typography>Welcome {user.data.username}</Typography>{' '}
					{/* <Typography variant="h2" className="bounce-in">
						Welcome {user.data.username}!
					</Typography> */}
				</>
			)}
		</div>
	);
};

export default Home;
