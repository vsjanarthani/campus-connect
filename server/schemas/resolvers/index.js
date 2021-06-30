const userResolvers = require('./users')
const messageResolvers = require('./messages')

const { User, Message } = require('../../models')

const resolvers = {
    Reaction: {
        message: async (parent) => await Message.findByPk(parent.messageId),
        user: async (parent) =>
            await User.findByPk(parent.userId, {
                attributes: ['username', 'imageUrl', 'createdAt'],
            }),
    },

    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
    Subscription: {
        ...messageResolvers.Subscription,
    },
}

module.exports = resolvers;