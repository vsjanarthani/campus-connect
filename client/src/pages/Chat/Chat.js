import React, { useEffect } from 'react';
import UserList from '../../components/UserList/UserList';
import ChatBody from '../../components/ChatBody/ChatBody';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "./chat.css";
import { MessageProvider } from '../../utils/messagecontext';
import { useSubscription } from '@apollo/client';
import { useAuthState } from '../../utils/auth';
import { useMessageDispatch } from '../../utils/messagecontext';
import { NEW_MESSAGE, NEW_REACTION } from '../../utils/subscriptions'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100vw',
        height: '80vh',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        background: "whitesmoke",
        boxShadow: "none",
    },
}));

const Chat = ({ history }) => {

    const classes = useStyles();

    const messageDispatch = useMessageDispatch()

    const { user } = useAuthState();

    const { data: messageData, error: messageError } = useSubscription(
        NEW_MESSAGE
    )

    const { data: reactionData, error: reactionError } = useSubscription(
        NEW_REACTION
    )

    useEffect(() => {
        if (messageError) console.log(messageError)

        if (messageData) {
            const message = messageData.newMessage
            const otherUser = user.username === message.to ? message.from : message.to

            messageDispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    username: otherUser,
                    msg: message,
                },
            })
        }
        console.log(messageError, messageData);
    }, [messageError, messageData])

    useEffect(() => {
        if (reactionError) console.log(reactionError)

        if (reactionData) {
            const reaction = reactionData.newReaction
            const otherUser =
                user.username === reaction.message.to
                    ? reaction.message.from
                    : reaction.message.to

            messageDispatch({
                type: 'ADD_REACTION',
                payload: {
                    username: otherUser,
                    reaction,
                },
            })
        }
        console.log(reactionError, reactionData);
    }, [reactionError, reactionData])

    return (
        <MessageProvider>
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item>
                        <UserList />
                    </Grid>
                    <Grid item>
                        <ChatBody />
                    </Grid>
                </Grid>
            </Paper>
        </MessageProvider>
    )
}

export default Chat
