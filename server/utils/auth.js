const jwt = require('jsonwebtoken');
const { PubSub } = require('apollo-server-express');
// require('dotenv').config();
const pubsub = new PubSub();

const secret = 'mysecretsshhhhh';
// const secret = process.env.SESSION_KEY;
const expiration = '2h';

const authMiddleware = (context) => {

  let token
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1]
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split('Bearer ')[1]
  }

  if (token) {
    jwt.verify(token, secret, (_err, decodedToken) => {
      context.user = decodedToken;
      // console.log(decodedToken);
      // Decode token exmaple below
      //  data: {
      //   username: 'Subash',
      //    email: 'subash@gmail.com',
      //    _id: '60daa7c806c2b64e9068b736'
      //  },
      //  iat: 1625124587,
      //  exp: 1625131787
      // }
    })
  }

  context.pubsub = pubsub

  return context
};

const authToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}


module.exports = { authMiddleware, authToken }

// unable to add the secret key to .env!