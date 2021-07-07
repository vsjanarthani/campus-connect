const userResolvers = require('./users')
const messageResolvers = require('./messages')

const resolvers = {
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
        ...userResolvers.Subscription
    },
}

module.exports = resolvers;