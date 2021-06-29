import React from 'react';
import UserList from '../../components/UserList/UserList';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "./chat.css";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '90vw',
        height: '90vh',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
}));

const Chat = () => {

    const classes = useStyles();
    return (
        <div className="chat-window">
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <UserList />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Chat
