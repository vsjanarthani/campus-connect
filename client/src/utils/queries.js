import gql from 'graphql-tag';

export const LOGIN_USER = gql`
 query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      businessLogo
      funLogo
      token
    }
  }
`;

export const GET_USERS = gql`
query getUsers {
  getUsers {
    username
    email
    createdAt
    businessLogo
    funLogo
    latestMessage {
      _id
      from
      to
      msg
      createdAt
    }
  }
}
`
export const GET_MESSAGES = gql`
query getMsgs($from: String!) {
  getMsgs(from: $from) {
    _id
    from
    to
    msg
    createdAt
    reactions {
      _id
      content
    }
  }
}
`