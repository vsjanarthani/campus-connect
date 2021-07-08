// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  username: String!
  email: String
  token: ID!
  createdAt: String!
  latestMessage: Message
  profile: [Profile]
}
type Message {
  _id: ID!
  msg: String!
  from: String!
  to: String!
  createdAt: String!
  reactionCount: Int
  reactions: [Reaction]
}
type Reaction {
    _id: ID!
    content: String!
    createdAt: String!
    username: String!
    messageId: String
  }
  type Profile {
    imageUrl: String
    funLogo: String
    businessLogo: String
    linkedin: String
    Instagram: String
  }
type Query {
  login(username: String!, password: String!): User!
  getUsers: [User]!
  getMsgs(from:String!): [Message]!
}
type Mutation {
  addUser(username: String!, email: String!, password: String!): User!
  sendMsg(to:String! msg:String!): Message!
  reactToMessage(messageId: ID!, content: String!): Message!
  createProfile(businessLogo: String, funLogo: String, imageUrl: String, linkedin: String, Instagram: String): User!
}
type Subscription {
    newMessage: Message!
    newReaction: Reaction!
    newUser: User!
  }
`;

module.exports = typeDefs;

// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/ - Date types for createdAt
// Should date be formated at the front end? sorting by createdAt could be a problems if its formatted?!