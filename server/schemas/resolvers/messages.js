const {
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    withFilter,
} = require('apollo-server-express')


const { Message, User } = require('../../models');

module.exports = {
    // Queries
    Query: {
        // Receive Messages sent to you
        getMsgs: async (_parent, { from }, context) => {
            // check if the user is logged in
            if (context.user) {
                // check if sender is in the database
                const sender = await User.findOne({ username: from });
                if (!sender) throw new UserInputError('User not found');

                // Get messages that are sent to the user and sort it by createdAt
                const msgToGet = await Message.find({
                    to: context.user.username
                }).sort({ createdAt: -1 });

                return msgToGet;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    // Mutations
    Mutation: {
        // Send message
        sendMsg: async (_parent, { to, msg }, context) => {
            // check if the user is logged in
            if (context.user) {
                // check if 'from' and 'to' are same
                if (context.user.username === to) throw new UserInputError('You can send msgs to yourself');
                // check if the receiver is in the database
                const receiver = await User.findOne({ username: to });
                if (!receiver) throw new UserInputError('User not found');
                // check if msg is empty
                if (msg.trim() === '') throw new UserInputError('Message is empty');
                // create new message and publish it
                const msgToSend = await Message.create({ from: context.user.username, to, msg });
                context.pubsub.publish('NEW_MESSAGE', { newMessage: msgToSend })
                return msgToSend;
            }
            throw new AuthenticationError('Not logged in');
        },
        // React to message
        // reactToMessage: async (_parent, { _id, content }, context) => {
        //   const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
        //   if (context.user) {

        //     // Validate reaction content
        //     if (!reactions.includes(content)) throw new UserInputError('Invalid reaction');
        //     // Get message
        //     const message = await Message.findOne({ _id })
        //     if (!message) throw new UserInputError('message not found')
        //     if (message.from !== user.username && message.to !== user.username) {
        //       throw new ForbiddenError('Unauthorized');
        //     }


        //   }
        //   throw new AuthenticationError('Not logged in');
        // }
    },

    // Subscriptions
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                (_parent, _args, context) => {
                    if (!context.user) throw new AuthenticationError('Unauthenticated')
                    return context.pubsub.asyncIterator('NEW_MESSAGE')
                },
                ({ newMessage }, _args, { user }) => {
                    if (
                        newMessage.from === user.username ||
                        newMessage.to === user.username
                    ) {
                        return true
                    }

                    return false
                }
            ),
        },
        newReaction: {
            subscribe: withFilter(
                (_parent, _args, context) => {
                    if (!context.user) throw new AuthenticationError('Unauthenticated')
                    return context.pubsub.asyncIterator('NEW_REACTION')
                },
                async ({ newReaction }, _args, { user }) => {
                    const message = await newReaction.getMessage()
                    if (message.from === user.username || message.to === user.username) {
                        return true
                    }

                    return false
                }
            ),
        },
    },
}