import gql from 'graphql-tag';

export const NEW_MESSAGE = gql`
subscription newMessage {
  newMessage {
    _id
    from
    to
    msg
    createdAt
  }
}
`

export const NEW_REACTION = gql`
  subscription newReaction {
    newReaction {
      _id
      content
      message {
        _id
        from
        to
      }
    }
  }
`

export const NEW_USER = gql`
  subscription newUser {
    newUser {
    token
      _id
      username
    email
    createdAt
    }
  
  }
`;

