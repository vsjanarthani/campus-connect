import React, { Fragment, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import { SEND_MESSAGE } from '../../utils/mutations';
import { GET_MESSAGES } from '../../utils/queries';
import {
	useMessageDispatch,
	useMessageState
} from '../../utils/messagecontext';
import Message from './Message';
import ForumIcon from '@material-ui/icons/Forum';
import InputAdornment from '@material-ui/core/InputAdornment';

import Initial from './chatInitial.js';

const useStyles = makeStyles(theme => ({
	input: {
		color: '#003262',
		'@media (max-width:600px)': {
			fontSize: '1rem'
		}
	},
	button: {
		marginTop: '1rem',
		color: '#003262',
		borderColor: 'grey'
	},
	field: {
		margin: '1rem 0rem',
		width: '100%'
	},
	text: {
		color: '#003262',
		textAlign: 'center',
		padding: '0.5rem'
	},
	div: {
		padding: theme.spacing(2),
		background: 'white'
	},
	message: {
		height: 'auto'
	}
}));

const ChatBody = () => {
	const classes = useStyles();
	const dispatch = useMessageDispatch();
	const [content, setContent] = useState('');
	const { users } = useMessageState();
	console.log(users);

	let selectedUser;
	let messages;
	if (users.length > 0) {
		selectedUser = users?.find(u => u?.selected === true);
		messages = selectedUser?.messages;
	}

	const [getMsgs, { loading: msgLoading, data: msgData }] =
		useLazyQuery(GET_MESSAGES);

	const [sendMsg] = useMutation(SEND_MESSAGE, {
		onError: err => console.log(err)
	});

	useEffect(() => {
		if (selectedUser && !selectedUser.messages) {
			getMsgs({ variables: { from: selectedUser.username } });
		}
	}, [selectedUser]);

	useEffect(() => {
		if (msgData) {
			dispatch({
				type: 'SET_USER_MESSAGES',
				payload: {
					username: selectedUser.username,
					messages: msgData.getMsgs
				}
			});
		}
	}, [msgData]);

	const handleFormSubmit = async event => {
		event.preventDefault();
		if (content.trim() === '' || !selectedUser) return;
		setContent('');
		// mutation for sending the message
		sendMsg({ variables: { to: selectedUser.username, msg: content } });
	};

	let selectedChatMarkup;
	if (!messages && !msgLoading) {
		return (selectedChatMarkup = (
			<p className="info-text">Select a friend</p>
		) && <Initial />);
	} else if (msgLoading) {
		selectedChatMarkup = <p className={classes.text}> Loading..</p>;
	} else if (messages?.length > 0) {
		selectedChatMarkup = messages.map(message => (
			<Fragment key={message._id}>
				<Message message={message} />
			</Fragment>
		));
	} else if (messages?.length === 0) {
		selectedChatMarkup = (
			<p className={classes.text}>Connected Successfully.</p>
		);
	}
	let friend;
	if (selectedUser) friend = selectedUser.username.toUpperCase();
	else {
		friend = '';
	}

	return (
		<div container>
			<div className={classes.text}>
				{' '}
				<ForumIcon /> {friend}{' '}
			</div>
			<div className={classes.div}>{selectedChatMarkup}</div>
			<div>
				<Box component="form" onSubmit={handleFormSubmit}>
					<TextField
						variant="outlined"
						name="msg"
						type="text"
						value={content}
						onChange={e => setContent(e.target.value)}
						inputProps={{ className: classes.input }}
						className={classes.field}
						label="Send Message"
						placeholder="Send a message..."
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Button endIcon={<Send />} type="submit"></Button>
								</InputAdornment>
							)
						}}
					/>
				</Box>
			</div>
		</div>
	);
};

export default ChatBody;

// Needs styling and proper alignment
// check on the errors that are displaying while compiling
