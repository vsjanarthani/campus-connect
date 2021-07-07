import React, { useEffect, useState } from 'react';
import './chat.css';
import UserList from '../../components/UserList/UserList';
import ChatBody from '../../components/ChatBody/ChatBody';
import { useSubscription } from '@apollo/client';
import { useAuthState } from '../../utils/auth';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Rail from '../../components/MobileRail';
import { makeStyles } from '@material-ui/core/styles';
import { useMessageDispatch } from '../../utils/messagecontext';
import { NEW_MESSAGE, NEW_REACTION, NEW_USER } from '../../utils/subscriptions';
import { Divider, Avatar, Hidden, SwipeableDrawer, Button } from '@material-ui/core';
// import { isNonEmptyArray } from '@apollo/client/utilities';

const Chat = props => {

	const useStyles = makeStyles(theme => ({
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

	const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);

	const { data: reactionData, error: reactionError } = useSubscription(NEW_REACTION);

	useEffect(() => {
		if (userError) console.log(userError);
		if (userData) {
			console.log("new user created", userData);
			const addedUser = userData.newUser;
			messageDispatch({ type: 'SET_NEW_USERS', payload: addedUser });
		}
	}, [userData])

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
		// console.log('useeffect for reaction');
		if (reactionError) console.log(reactionError);
		// console.log(reactionData);
		if (reactionData) {
			const reaction = reactionData.newReaction;
			const user1 =
				user.username === reaction.message.to
					? reaction.message.from
					: reaction.message.to;
			const user2 =
				user.username === reaction.message.to
					? reaction.message.to
					: reaction.message.from;
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
	const [open, setOpen] = useState(false);

	return (
		<div className="messenger">
			<Hidden smDown>
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<IconButton onClick={() => setOpen(true)}>
							<BackspaceIcon className={classes.opener}> </BackspaceIcon>
						</IconButton>
						<Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
							<Rail />
						</Drawer>
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
	);
};

export default Chat;
// need to add dynamic avatar for logged in user, hardcoded image now
