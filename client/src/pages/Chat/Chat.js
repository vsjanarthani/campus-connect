import React, { useEffect } from 'react';
import "./chat.css";
import UserList from '../../components/UserList/UserList';
import ChatBody from '../../components/ChatBody/ChatBody';
import { useSubscription } from '@apollo/client';
import { useAuthState } from '../../utils/auth';

import ForumIcon from '@material-ui/icons/Forum';
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';
import { useMessageDispatch } from '../../utils/messagecontext';
import { NEW_MESSAGE, NEW_REACTION } from '../../utils/subscriptions'
// import { TextField } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from "@material-ui/core/Divider";

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
    root: {
        dividerColor: `#F5F5F5`
    },

}));
const Chat = () => {


  const messageDispatch = useMessageDispatch()

  const { user } = useAuthState()

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
          message,
        },
      })
    }
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
  }, [reactionError, reactionData])


    

    return (
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className="aligned"><Avatar id="myavatar" src="https://res.cloudinary.com/www-actionnetwork-com/image/upload/v1625022844/Frame_5_jpasit.png" style={{
             border: '0.1px solid lightgray'
          }}></Avatar> <span id="namename">{user.data.username}'s Friends</span>
 </div>
                    <Divider className="dividerColor"/>
                    {/* <TextField
                          className="chatMenuInput" variant="outlined"
                  
                           label="Find Friends"
                           type="text"
                           placeholder="Who do you want to reconnect with?"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                   <SearchIcon />
                                   </InputAdornment>
                                  
                                   ),
                               }}
                           /> */}
                       <UserList />
                   </div>
         
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                    <div className="chatBanner"> <ForumIcon></ForumIcon> ChatFriend Username </div>  
                        <div className="messagesHere">
                            <ChatBody />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Chat
