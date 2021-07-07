const { UserInputError, AuthenticationError, withFilter } = require('apollo-server-express');
const { User, Message } = require('../../models');
const { authToken } = require('../../utils/auth');

module.exports = {
  // Queries
  Query: {
    // get all users
    getUsers: async (_parent, _args, context) => {
      // console.log(context.user);
      try {
        // throw error if the user is not logged in
        if (!context.user) throw new AuthenticationError('Not logged in');
        const clientName = context.user.username;
        let allUsers = await User.find({ username: { $ne: clientName } });
        const msgs = await Message.find({ $or: [{ from: clientName }, { to: clientName }] })
          .sort({ createdAt: -1 });
        allUsers = allUsers.map((otherUser) => {
          const latestMessage = msgs.find(
            (m) => m.from === otherUser.username || m.to === otherUser.username)
          otherUser.latestMessage = latestMessage
          return otherUser
        })
        return allUsers;
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    // user login
    login: async (_parent, { username, password }) => {
      let errors = {}
      try {
        // Validate user input
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password === '') errors.password = 'password must not be empty'

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors })
        }
        // check if email is in the database
        const user = await User.findOne({ username });
        if (!user) throw new AuthenticationError('Incorrect Credentials');
        // check if password is matching/correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) throw new AuthenticationError('Incorrect Credentials');
        const token = authToken(user);
        return {
          ...user.toJSON(),
          token,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },

  // Mutations
  Mutation: {
    // Add user or signup
    addUser: async (_parent, args, context) => {
      let { username, email, password } = args
      let errors = {}
      try {
        // Validate user input
        if (email.trim() === '') errors.email = 'email must not be empty'
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password.trim() === '')
          errors.password = 'password must not be empty'
        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors })
        }
        const user = await User.create(args);
        const token = authToken(user);
        const newUser = JSON.parse(JSON.stringify(user));
        newUser.token = token;
        context.pubsub.publish('NEW_USER', { newUser })
        return newUser
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    // update user
    createProfile: async (_parent, args, context) => {
      try {
        // throw error if the user is not logged in
        if (!context.user) throw new AuthenticationError('Not logged in');
        const user = context.user.data.username;
        const { businessLogo, funLogo, imageUrl, linkedin, Instagram } = args;
        const updatedUser = await User.findOneAndUpdate(
          { username: user },
          { $set: { profile: { businessLogo, funLogo, imageUrl, linkedin, Instagram } } },
          { new: true }
        );
        // console.log(updatedUser);
        return updatedUser;
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },

  Subscription: {
    newUser: {
      subscribe: withFilter(
        (_parent, _args, context) => {
          if (!context.user) throw new AuthenticationError('Unauthenticated');
          return context.pubsub.asyncIterator('NEW_USER')
        },
        ({ newUser }, _args, { user }) => {
          console.log(newUser);
          if (newUser) return true;
          else return false;
        }
      )
    }
  }
};


// To do:
// 1. Catch all database errors to display on the front-end
// 2. change getmsgs to include msg sent by as well as sent to you
// 3. reactToMessage is incomplete, need to complete it
// 4. move JWT_SECRET to process.env