import React from 'react';
import { useAuthState } from '../../utils/auth';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { useMutation } from '@apollo/client';
import { REACT_TO_MESSAGE } from '../../utils/mutations';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import "./message.css";
import moment from "moment";

// reactions to messages
const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']

const useStyles = makeStyles((theme) => ({
    container: {
        display: "block",
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
    shapeCircle: {
        borderRadius: '50%',
    },
}));

const Message = ({ message }) => {
    const classes = useStyles();
    const { user } = useAuthState();
    // console.log(user.data.username)
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
    // assigning variables to differentiate message style of sender and receiver
    const sent = message.from === user.data.username;
    const received = !sent;
    const reactionIcons = [...new Set(message.reactions.map((r) => r.content))]
    const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
        onError: (err) => console.log(err),
        onCompleted: (data) => {
            console.log(data);
        },
    });

    // Adding reaction
    const sendReaction = (event) => {
        let content = event.target.innerText;
        let messageId = event.target.parentElement.id;
        reactToMessage({ variables: { messageId, content } })
    }

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
        <BottomNavigation className={classes.container} key={message._id}>

            {/* placement={sent ? 'right' : 'left'} */}

            <div className={sent ? "message user" : "message"}>
                <div className="messageTop">
                    <Tooltip title={moment(message.createdAt * 1).format('MMMM Do YYYY, h:mm:ss a')}>
                        <p className="messageText">
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
                                        key={message.reaction}
                                        id={message._id}
                                        value={reaction}
                                        onClick={sendReaction}
                                    >
                                        {reaction}
                                    </Button>
                                ))}
                            </Typography>
                        </Popover>
                        <Badge color="primary" overlap="circle" badgeContent={message.reactions.length}>
                            {reactionIcons}
                        </Badge>
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
