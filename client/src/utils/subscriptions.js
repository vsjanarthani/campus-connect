import gql from 'graphql-tag';

export const NEW_MESSAGE = gql`
subscription newMessage {
  newMessage {
    _id
    from
    to
    content
    createdAt
  }
}
`