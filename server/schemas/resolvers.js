const { UserInputError,
  AuthenticationError,
  ForbiddenError,
  withFilter, } = require('apollo-server-express');
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
      // check if the user is logged in
      if (context.user) {
        const allUsers = await User.find();
        return allUsers;
      }
      throw new AuthenticationError('Not logged in');
    },

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
    // Add user or signup
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // user login
    login: async (_parent, { email, password }) => {

      // check if email is in the database
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Incorrect Credentials');

      // check if password is matching/correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect Credentials');

      const token = signToken(user);
      return { token, user };
    },

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
    reactToMessage: async (_parent, { _id, content }, context) => {
      const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
      if (context.user) {

        // Validate reaction content
        if (!reactions.includes(content)) throw new UserInputError('Invalid reaction');
        // Get message
        const message = await Message.findOne({ _id })
        if (!message) throw new UserInputError('message not found')
        if (message.from !== user.username && message.to !== user.username) {
          throw new ForbiddenError('Unauthorized');
        }


      }
      throw new AuthenticationError('Not logged in');
    }
  },
};

module.exports = resolvers;

// To do:
// 1. Catch all database errors to display on the front-end
// 2. change getmsgs to include msg sent by as well as sent to you