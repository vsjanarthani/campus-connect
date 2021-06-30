import gql from 'graphql-tag';



export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REACT_TO_MESSAGE = gql`
mutation reactToMessage($_id: ID!, $content: String!) {
  reactToMessage(_id: $messageId, content: $content) {
    _id
    reactionCount
      reactions {
        _id
        content
        createdAt
        username
      }
  }
}
`
export const SEND_MESSAGE = gql`
mutation sendMsg($to: String!, $msg: String!) {
  sendMsg(to: $to, msg: $msg) {
    _id
    from
    to
    msg
    createdAt
  }
}
`