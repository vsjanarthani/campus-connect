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
}

type Query {
  user(username: String!): User
  getUsers: [Users]!
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  sendMsg(to:String! msg:String!): Message!
}
`;

module.exports = typeDefs;