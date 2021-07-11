import React, { useEffect } from 'react';
import './chat.css';
import UserList from '../../components/UserList/UserList';
import ChatBody from '../../components/ChatBody/ChatBody';
import { useSubscription } from '@apollo/client';
import { useAuthState } from '../../utils/auth';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Rail from '../../components/MobileRail';
import { useMessageDispatch } from '../../utils/messagecontext';
import { NEW_MESSAGE, NEW_REACTION, NEW_USER } from '../../utils/subscriptions';
import {
	makeStyles,
	Divider,
	Avatar,
	Hidden,
	SwipeableDrawer,
	Button,
	Typography
} from '@material-ui/core';

const Chat = props => {
	const useStyles = makeStyles(_theme => ({
		root: {
			dividerColor: `#F5F5F5`
		},
		text: {
			color: props.data.text
		}
	}));

	const classes = useStyles();

	const [state, setState] = React.useState({
		right: false
	});

	const toggleDrawer = (anchor, open) => event => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const messageDispatch = useMessageDispatch();

	const { user } = useAuthState();

	const { data: userData, error: userError } = useSubscription(NEW_USER);

	const { data: messageData, error: messageError } =
		useSubscription(NEW_MESSAGE);

	const { data: reactionData, error: reactionError } =
		useSubscription(NEW_REACTION);

	useEffect(() => {
		if (userError) console.log(userError);
		if (userData) {
			// console.log('new user created', userData);
			const addedUser = {
				username: userData.newUser.username,
				email: userData.newUser.email,
				createdAt: userData.newUser.createdAt,
				latestMessage: null,
				profile: [],
				__typename: "User",
			}
			// console.log(addedUser);
			messageDispatch({ type: 'SET_NEW_USERS', payload: { addedUser: addedUser } });
		}
	}, [userError, userData]);

	useEffect(() => {
		if (messageError) console.log(messageError);
		if (messageData) {
			const message = messageData.newMessage;
			const user1 = user.username === message.to ? message.from : message.to;
			const user2 = user.username === message.to ? message.to : message.from;
			messageDispatch({
				type: 'ADD_MESSAGE',
				payload: {
					username: user1,
					self: user2,
					message
				}
			});
		}
	}, [messageError, messageData]);

	useEffect(() => {
		if (reactionError) console.log(reactionError);
		if (reactionData) {
			const reaction = reactionData.newReaction;
			// console.log(reaction);
			const user1 = reaction.username;
			const user2 = user.data.username;
			// console.log(user1, user2);
			messageDispatch({
				type: 'ADD_REACTION',
				payload: {
					username: user1,
					self: user2,
					reaction
				}
			});
		}
	}, [reactionError, reactionData]);

	return (
		<div>
			{!user.data ? (
				<>
					<Typography variant="h4">
						Loading.. Please refresh
					</Typography>
				</>
			) : (
				<>
					<div className="messenger">
						<Hidden smDown>
							<div className="chatMenu">
								<div className="chatMenuWrapper">
									<div className="aligned">
										<Avatar
											id="myavatar"
											src="https://res.cloudinary.com/www-actionnetwork-com/image/upload/v1625022844/Frame_5_jpasit.png"
											style={{
												border: '0.1px solid lightgray'
											}}
										></Avatar>{' '}
										<span id="namename" className={classes.text}>
											{user.data.username}'s Friends
										</span>
									</div>

									<Divider className="dividerColor" />
									<UserList data={props.data} className="mobile-hide" />
								</div>
							</div>
						</Hidden>
						<Hidden mdUp>
							{['left'].map(anchor => (
								<React.Fragment key={anchor}>
									<Button onClick={toggleDrawer(anchor, true)}>
										<ChevronRightIcon />
									</Button>
									<SwipeableDrawer
										anchor={anchor}
										open={state[anchor]}
										onClose={toggleDrawer(anchor, false)}
										onOpen={toggleDrawer(anchor, true)}
									>
										<Rail data={props.data} />
									</SwipeableDrawer>
								</React.Fragment>
							))}
						</Hidden>
						<div className="chatBox">
							<div className="chatBoxWrapper">
								<div className="messagesHere">
									<ChatBody />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Chat;
