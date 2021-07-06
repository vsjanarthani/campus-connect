import React from 'react';
import { useAuthState } from '../../utils/auth';
import { Typography } from '@material-ui/core';

const Home = () => {
	const { user } = useAuthState();
	console.log(user);
	return (
		<div>
			{!user ? (
				<>
					<Typography>Welcome to Campus Connect</Typography>
				</>
			) : (
				<>
					<Typography>Welcome {user.data.username}</Typography>
				</>
			)}
		</div>
	);
};

export default Home;
