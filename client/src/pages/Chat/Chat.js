import React from 'react';
import UserList from '../../components/UserList/UserList';
import ChatBody from '../../components/ChatBody/ChatBody';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "./chat.css";
import { MessageProvider } from '../../utils/messagecontext';

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

const Chat = () => {

    const classes = useStyles();

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
