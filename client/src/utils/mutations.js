import gql from 'graphql-tag';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
        _id
        username
    email
    createdAt
    }
  }
`;

export const REACT_TO_MESSAGE = gql`
 mutation reactToMessage($messageId: ID!, $content: String!) {
    reactToMessage(messageId: $messageId, content: $content) {
      _id
      reactionCount
      reactions {
        _id
        content
        createdAt
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
export const CREATE_PROFILE = gql`
mutation createProfile($businessLogo: String, $funLogo: String, $imageUrl: String, $linkedin: String, $Instagram: String ) {
  createProfile(businessLogo: $businessLogo, funLogo: $funLogo, imageUrl: $imageUrl, linkedin: $linkedin, Instagram:$Instagram){  
    username
    profile{
      imageUrl
      businessLogo
      funLogo
      Instagram
      linkedin
    }
  }
}
`