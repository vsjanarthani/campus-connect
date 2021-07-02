import React from 'react';
import { useAuthState } from '../../utils/auth';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sent: {

    },
    received: {

    },
    button: {
        marginTop: "1rem",
        color: "#003262",
        borderColor: "grey",
    },
    field: {
        margin: "1rem 0rem",
    },
}));

const Message = ({ message }) => {
    const classes = useStyles();
    const { user } = useAuthState();
    const sent = message.from === user.username
    // const received = !sent
    return (
        <BottomNavigation
            placement={sent ? 'right' : 'left'}
            overlay={
                <Tooltip>
                    {message.createdAt}
                </Tooltip>
            }
        >
            <p className={classes.sent} key={message._id}>
                {message.msg}
            </p>
        </BottomNavigation >
    )
}

export default Message
