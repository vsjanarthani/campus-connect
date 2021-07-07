import React from 'react';
//Material UI Items
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import UserList from '../../components/UserList/UserList';
// import { MessageProvider } from '../../utils/messagecontext';
import { useAuthState } from '../../utils/auth';

// import ForumIcon from '@material-ui/icons/Forum';
// import Send from '@material-ui/icons/Send';
// import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(() => ({
	menuRail: {
		width: '280 px',
		textAlign: 'left',
		fontFamily: 'Poppins',
		weight: `800`,
		background: '#F5F5F5',
		height: '100%',
		marginTop: '20px'
	},
	active: {
		color: '#003363',
		fontFamily: 'Poppins'
	},
	listItem: {
		'&:hover': {
			color: 'black'
		},
		marginTop: `2rem`,
		fontSize: `1rem`,
		color: `black`,
		fontFamily: 'Poppins',
		marginBottom: `2rem`
	},
	myname: {
		display: 'flex',
		flexWrap: 'no-wrap',
		width: '240px'
	},
	railname: {
		fontSize: `1rem`,
		fontFamily: 'Poppins',

		marginLeft: `20px`,
		marginTop: `10px`,
		marginBottom: `10px`,

		color: `black`,
		weight: `extrabold`,
		justifyContent: `center`
	},

	avatar: {
		width: `5rem`,
		height: `5rem`,
		justifyContent: `center`
	}
}));

const Rail = props => {
	const classes = useStyles();

	const { user } = useAuthState();

	return (
		<Box className={classes.menuRail} component="div">
			<Divider /> <Divider />
			<Grid className="myname">
				<Typography className={classes.railname}>
					{' '}
					<Avatar
						id="myavatar"
						src="https://res.cloudinary.com/www-actionnetwork-com/image/upload/v1625022844/Frame_5_jpasit.png"
						style={{
							border: '0.1px solid lightgray'
						}}
					></Avatar>{' '}
					<span id="namename">{user.data.username}'s Friends</span>
				</Typography>
			</Grid>{' '}
			<Divider />
			<Divider />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<UserList data={props.data} />
					</div>
				</div>
			</div>
		</Box>
	);
};

export default Rail;

// TO DO: SHOULD ONLY SHOW ON THE CHAT PAGE - OTHERWISE, NOT USEFUL
// HIDE IF ON A BIGGER DEVICE, SHOULD LINK WITH TRANSITION OF REGULAR "MENU" OF FRIENDS
