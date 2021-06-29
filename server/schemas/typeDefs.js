// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  username: String
  email: String
}
type Auth {
  token: ID!
  user: User
}
type Users {
  username: String!
  email: String!
}
type Message {
  _id: ID!
  msg: String!
  from: String!
  to: String!
  createdAt: String!
}

type Query {
  user(username: String!): User
  getUsers: [Users]!
  getMsgs(from:String!): [Message]!
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  sendMsg(to:String! msg:String!): Message!
}
`;

module.exports = typeDefs;

// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/ - Date types for createdAt
// Should date be formated at the front end? sorting by createdAt could be a problems if its formatted?!