import gql from 'graphql-tag';

export const NEW_MESSAGE = gql`
subscription newMessage {
  newMessage {
    uuid
    from
    to
    content
    createdAt
  }
}
`