import React, { createContext, useReducer, useContext } from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const messageReducer = (state, action) => {
    let usersCopy, userIndex;
    const { username, message, messages, reaction, self, addedUser } = action.payload
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.payload]
            }

        case 'SET_NEW_USERS':
            console.log(state.users);
            usersCopy = state.users.push(addedUser)
            return {
                ...state,
                users: usersCopy,
            }
        case 'SET_USER_MESSAGES':

            usersCopy = [...state.users]
            userIndex = usersCopy.findIndex((u) => u.username === username)
            usersCopy[userIndex] = { ...usersCopy[userIndex], messages }

            return {
                ...state,
                users: usersCopy,
            }
        case 'SET_SELECTED_USER':
            usersCopy = state.users.map((user) => ({
                ...user,
                selected: user.username === action.payload,
            }))

            return {
                ...state,
                users: usersCopy,
            }
        case 'ADD_MESSAGE':
            // console.log(state);
            usersCopy = [...state.users]
            const addMessage = (theUser) => {
                userIndex = usersCopy.findIndex((u) => u.username === theUser)
                message.reactions = []

                let newUser = {
                    ...usersCopy[userIndex],
                    updated: new Date(),
                    messages: usersCopy[userIndex].messages
                        ? [...usersCopy[userIndex].messages, message]
                        : [],
                    latestMessage: message,
                }
                usersCopy[userIndex] = newUser
            }
            addMessage(username);
            addMessage(self);
            return {
                ...state,
                users: usersCopy,
            }

        case 'ADD_REACTION':
            usersCopy = [...state.users]
            const addReaction = (theUser) => {

                userIndex = usersCopy.findIndex((u) => u.username === theUser)
                // Make a shallow copy of user
                let userCopy = { ...usersCopy[userIndex] }
                console.log(userCopy)

                // Find the index of the message that this reaction pertains to
                const messageIndex = userCopy.messages?.findIndex(
                    (m) => m._id === reaction.messageId
                )

                if (messageIndex > -1) {
                    // Make a shallow copy of user messages
                    let messagesCopy = [...userCopy.messages]
                    console.log(messagesCopy);

                    // Make a shallow copy of user message reactions
                    let reactionsCopy = [...messagesCopy[messageIndex].reactions]

                    const reactionIndex = reactionsCopy.findIndex(
                        (r) => r._id === reaction._id
                    )

                    if (reactionIndex > -1) {
                        // Reaction exists, update it
                        reactionsCopy[reactionIndex] = reaction
                    } else {
                        // New Reaction, add it
                        reactionsCopy = [...reactionsCopy, reaction]
                    }

                    messagesCopy[messageIndex] = {
                        ...messagesCopy[messageIndex],
                        reactions: reactionsCopy,
                    }

                    userCopy = { ...userCopy, messages: messagesCopy }
                    usersCopy[userIndex] = userCopy
                }
            }
            addReaction(username);
            addReaction(self);
            return {
                ...state,
                users: usersCopy,
            }

        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export const MessageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(messageReducer, { users: [] })
    return (
        <MessageDispatchContext.Provider value={dispatch}>
            <MessageStateContext.Provider value={state}>
                {children}
            </MessageStateContext.Provider>
        </MessageDispatchContext.Provider>
    )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)