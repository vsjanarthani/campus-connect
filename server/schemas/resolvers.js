const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // Queries
  Query: {
    // find one user whose email matches the req
    user: async (_parent, { email }) => {
      return User.findOne({ email })
        .select('-__v -password')
    },
    // get all users
    getUsers: async (_parent, _args, context) => {
      if (context.user) {
        const allUsers = await User.find();
        return allUsers;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  // Mutations
  Mutation: {
    // Add user or signup
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // user login
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Username');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Send message
    sendMsg: async (_parent, { to, msg }, context) => {
      if (context.user) {
        const receiver = await User.findOne({ username: to });
        if (!receiver) throw new UserInputError('User not found');
        const msgToSend = await Message.create({ from: context.user.username, to, msg });
        return msgToSend;
      }
      throw new AuthenticationError('Not logged in');
    }
  },
};

module.exports = resolvers;

// To do: errors to display if username is not unquie upon sign in