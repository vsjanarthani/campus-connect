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
						Congratulation BootCamp Grads!!
					</Typography>
					<Container maxWidth="sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto
						error voluptatem eius accusantium, fugiat rerum provident alias modi
						officiis nostrum, velit commodi sint deserunt reprehenderit illo
						odit culpa quibusdam?
					</Container>
				</>
			) : (
				<>
					{' '}
					<Typography>Welcome {user.data.username}</Typography>{' '}
					<Typography variant="h2" className="bounce-in">
						Congrats {user.data.username}!
					</Typography>
				</>
			)}
		</div>
	);
};

export default Home;
