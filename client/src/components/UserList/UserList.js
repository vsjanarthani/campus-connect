import React, {useEffect} from 'react';
import './userList.css';
import { NEW_USER } from '../../utils/subscriptions';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_USERS } from '../../utils/queries';
import {
	useMessageDispatch,
	useMessageState
} from '../../utils/messagecontext';
import { useAuthState } from '../../utils/auth';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(() => ({
	root: {
		dividerColor: `#F5F5F5`
	},
	iconChat: {
		fontsize: '1rem'
	},
	socialbtn: {
		width: '5px'
	},
	container: {
		flexGrow: 1,
		maxHeight: '100%',
		overflow: 'auto',
		borderRadius: '5px',
		paddingBottom: `1vh`,
		background: '#FFFFFF',
		boxShadow: `inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19)`
	},
	listItem: {
		color: '#003262',
		paddingLeft: '0.5rem',
		textTransform: 'none',
		'&:hover': {
			color: '#15B313'
		},
		'& .MuiTypography-body1': {
			'@media (max-width:1200px)': {
				fontSize: '0.9rem'
			},
			'@media (min-width:1200px)': {
				fontSize: '1.1rem'
			}
		}
	}
}));

const UserList = props => {
	const classes = useStyles();
	const dispatch = useMessageDispatch();
	const { users } = useMessageState();
	const { user } = useAuthState();
	// const selectedUser = users?.find((u) => u.selected === true)?.username

	const { loading } = useQuery(GET_USERS, {
		onCompleted: data => {
			console.log("aliff is amazing-get users query", data)
			return dispatch({ type: 'SET_USERS', payload: data.getUsers })},
		onError: err => console.log(err)
	});

	const { data: userData, error: userError } = useSubscription(NEW_USER);

	useEffect(()=> {
		
		console.log("Changed to NEWUSERDATA", userData);
		console.log("USERS", users);
		if(userData) {

			dispatch({ type: 'SET_USERS', payload: [...users, {profile: [], ...userData.newUser}] })
		}
	}, [userData])

	let usersMarkup;
	if (!users || loading) {
		usersMarkup = <p>Loading..</p>;
	} else if (users.length === 0) {
		usersMarkup = <p>No users have joined yet</p>;
	} else if (users.length > 0) {
		const userList = users.filter(list => list.username !== user.data.username);
		usersMarkup = userList.map(user => {
			let avatar;
			if (props.data.funAvatar) {
				avatar = user.profile[0]?.funLogo;
			} else {
				avatar = user.profile[0]?.businessLogo;
			}
			return (
				<div key={user.username}>
					<ListItem
						id="conversation"
						className={classes.listItem}
						onClick={() =>
							dispatch({ type: 'SET_SELECTED_USER', payload: user.username })
						}
						component={Button}
					>
						<FiberManualRecordIcon className="active" />
						<Avatar
							alt={user.username}
							src={
								avatar ||
								'https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png'
							}
						/>
						<ListItemText
							primary={user.username}
							className="conversationName"
						/>
						{/* <ListItemText secondary={user.latestMessage
							? user.latestMessage.content
							: 'Connected..'} /> */}
						<Button
							href={user.linkedin || 'https://www.linkedin.com'}
							target="_blank"
							className={classes.socialbtn}
						>
							<LinkedInIcon className="iconChat" />{' '}
						</Button>
						<Button
							href={user.instagram || 'https://www.instagram.com'}
							target="_blank"
							id="social"
						>
							{' '}
							<InstagramIcon className={classes.iconChat} />
						</Button>
					</ListItem>
					<Divider classes={{ root: classes.dividerColor }} />
				</div>
			);
		});
	}
	return (
		<Box className={classes.container} component="div">
			<List>{usersMarkup}</List>
		</Box>
	);
};
export default UserList;

// https://icons8.com/icon/set/characters/office - Good reference for random free icon links
