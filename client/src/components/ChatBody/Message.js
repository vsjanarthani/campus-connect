import React from 'react';
import { useAuthState } from '../../utils/auth';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { useMutation } from '@apollo/client';
// do we need to use subscription here?
// import { useSubscription } from '@apollo/client';
import { REACT_TO_MESSAGE } from '../../utils/mutations';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { makeStyles } from '@material-ui/core/styles';
import "./message.css";
import moment from "moment";


const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']

const useStyles = makeStyles((theme) => ({
    sent: {

    },
    received: {

    },
    button: {
        marginTop: "1rem",
    },
    field: {
        margin: "1rem 0rem",
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

const Message = ({ message }) => {
    const classes = useStyles();
    const { user } = useAuthState();
    // something with sent/recieved not working;
    const sent = message.from === user.username;
    const received = !sent;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <BottomNavigation >

            {/* placement={sent ? 'right' : 'left'} */}



            <div className={sent ? "message user" : "message"}>
                <div className="messageTop">
                    <Tooltip title={moment(message.createdAt * 1).format('MMMM Do YYYY, h:mm:ss a')}>
                        <p className="messageText" key={message._id}>
                            {message.msg}
                        </p>
                    </Tooltip>
                    <div>
                        <IconButton aria-describedby={id} color="primary" onClick={handleClick}>
                            <InsertEmoticonIcon />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>
                                {reactions.map((reaction) => (
                                    <Button
                                        // variant="link"
                                        // className="react-icon-button"
                                        key={reaction}
                                    // onClick={() => react(reaction)}
                                    >
                                        {reaction}
                                    </Button>
                                ))}
                            </Typography>
                        </Popover>
                    </div>
                </div>
                {/* <div className="messageBottom">
                    1 hour ago
            </div> */}
            </div>

        </BottomNavigation >
    )
}

export default Message
