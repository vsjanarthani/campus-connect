import gql from 'graphql-tag';

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