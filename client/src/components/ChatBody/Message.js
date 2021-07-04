import React from 'react';
import { useAuthState } from '../../utils/auth';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Tooltip from '@material-ui/core/Tooltip';
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
        <BottomNavigation >

            {/* placement={sent ? 'right' : 'left'} */}



            <div className={user ? "message user" : "message"}>
                <div className="messageTop">
                    <Tooltip title={moment(message.createdAt * 1).format('MMMM Do YYYY, h:mm:ss a')}>
                        <p className="messageText" key={message._id}>
                            {message.msg}
                        </p>



                    </Tooltip>

                </div>
                {/* <div className="messageBottom">
                    1 hour ago
            </div> */}
            </div>

        </BottomNavigation >
    )
}

export default Message
