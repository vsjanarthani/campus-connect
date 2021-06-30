import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const GET_USERS = gql`
query getUsers {
  getUsers {
    username
    createdAt
    image
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
query getMessages($from: String!) {
  getMessages(from: $from) {
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