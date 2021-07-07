import React, { Fragment, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Send from '@material-ui/icons/Send';
import { SEND_MESSAGE } from '../../utils/mutations';
import { GET_MESSAGES } from '../../utils/queries';
import { useMessageDispatch, useMessageState } from '../../utils/messagecontext';
import Message from './Message';
import ForumIcon from '@material-ui/icons/Forum';
import InputAdornment from '@material-ui/core/InputAdornment';


import Initial from './chatInitial.js'

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    //     padding: theme.spacing(2),
    //     height: "100vh",

    // },
    input: {
        color: "#003262",
        '@media (max-width:600px)': {
            fontSize: '1rem',
        },
    },
    button: {
        marginTop: "1rem",
        color: "#003262",

        borderColor: "grey",
    },
    field: {
        margin: "1rem 0rem",
        width: "100%"

    },
}));

const InputField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "grey",
        },
        "& label": {
            color: "#003262",
            '@media (max-width:600px)': {
                fontSize: '0.9rem',
            },
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
            },
            "&:hover fieldset": {
                borderColor: "coffee",
            },
            "&.Mui-focused fieldset": {
                color: "whitesmoke",
                borderColor: "grey",
            },
        },
    },
})(TextField);

const ChatBody = () => {
    const classes = useStyles();
    const { users } = useMessageState();
    const dispatch = useMessageDispatch();
    const [content, setContent] = useState('');
    const selectedUser = users?.find((u) => u.selected === true)
    const messages = selectedUser?.messages


    const [getMsgs, {
        loading: msgLoading, data: msgData },
    ] = useLazyQuery(GET_MESSAGES);

    const [sendMsg] = useMutation(SEND_MESSAGE, {
        onError: (err) => console.log(err),
    })

    useEffect(() => {
        if (selectedUser && !selectedUser.messages) {
            getMsgs({ variables: { from: selectedUser.username } })
        }
    }, [selectedUser]);

    useEffect(() => {
        if (msgData) {
            dispatch({
                type: 'SET_USER_MESSAGES',
                payload: {
                    username: selectedUser.username,
                    messages: msgData.getMsgs,
                },
            })
        }
    }, [msgData]);

    const handleFormSubmit = async event => {
        event.preventDefault();
        if (content.trim() === '' || !selectedUser) return
        setContent('')
        // mutation for sending the message
        sendMsg({ variables: { to: selectedUser.username, msg: content } })
    }

    let selectedChatMarkup
    if (!messages && !msgLoading) {
       return selectedChatMarkup = <p className="info-text">Select a friend</p> && <Initial/>

    } else if (msgLoading) {
        selectedChatMarkup = <p className="info-text">Loading..</p>
    } else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message, index) => (
            <Fragment key={message._id}>
                <Message message={message} />
                {index === messages.length - 1 && (
                    <div className="invisible">
                        <hr className="m-0" />
                    </div>
                )}
            </Fragment>
        )) 
    } else if (messages.length === 0) {
        selectedChatMarkup = (
            <p className="info-text">
                You are now connected to {selectedUser.username}! Send them a message.
            </p>
        )
    }
    let friend
    if (selectedUser) friend = (selectedUser.username).toUpperCase();
    else {friend = ""};
    
    return (

        <div>
            <div className="chatBanner">
                {' '}
                {/* <ForumIcon></ForumIcon> [CHATFRIEND USERNAME]{' '} */}
                <ForumIcon></ForumIcon> {friend}{' '}
            </div>
            {selectedChatMarkup}

            <Box component="form" className={classes.form} onSubmit={handleFormSubmit}>

                <TextField

                    variant="outlined"
                    name='msg'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    inputProps={{ className: classes.input }}
                    className={classes.field}
                    label="Send Message"
                    placeholder="Send a message..."
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button

                                    endIcon={<Send />}
                                    type="submit" >

                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

        </div>
    )
}

export default ChatBody

// Needs styling and proper alignment
// check on the errors that are displaying while compiling