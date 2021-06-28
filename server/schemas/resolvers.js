const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
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
    getUsers: async () => {
      try {
        return User.find();
      } catch (error) {
        console.log(error);
      }
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
    }
  },
};

module.exports = resolvers;

// To do: errors to display if username is not unquie upon sign in