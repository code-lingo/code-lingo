const firebase = require('firebase-admin');
const serviceAccount = require('../../firebaseAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://codelingo-99ba7.firebaseio.com',
});

const isAuthenticated = (req, res, next) => {
  const authorization = req.header('Authorization');
  if (authorization) {
    firebase
      .auth()
      .verifyIdToken(authorization)
      .then(decodedToken => {
        console.log(decodedToken); // Check decoding
        res.locals.user = decodedToken;
        next();
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(401);
      });
  } else {
    console.log('Authorization header is not found');
    res.sendStatus(401);
  }
};

module.exports = isAuthenticated;
