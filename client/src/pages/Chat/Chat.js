import React, { useEffect } from 'react';
import "./chat.css";
import UserList from '../../components/UserList/UserList';
import ChatBody from '../../components/ChatBody/ChatBody';
import { useSubscription } from '@apollo/client';
import { useAuthState } from '../../utils/auth';
import { useMessageDispatch } from '../../utils/messagecontext';
import { NEW_MESSAGE, NEW_REACTION } from '../../utils/subscriptions'
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


const Chat = ({ history }) => {


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
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                    <TextField
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
                           />
                       <UserList />
                   </div>
         
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="messagesHere">
                            <ChatBody />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Chat
