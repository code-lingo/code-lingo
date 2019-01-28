const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const port = 8080 || process.env.PORT;
const app = express();

// TODO: create firebase endpoints

const firebase = require('firebase-admin');
const serviceAccount = require('../firebaseAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://codelingo-99ba7.firebaseio.com',
});

// TODO: move these to firebase endpoints?

// const db = firebase.database();
// const ref = db.ref('users/');
// ref.once('value', function(snapshot) {
//   console.log(snapshot.val());
// });

// const usersRef = ref.child('users12345');
// usersRef.set({
//   email: 'cody@gmail.com',
//   username: 'Cody',
// });

app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// TODO: add auth routes && api routes once we can create firebase connections

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.stack || 500).send(err.message || 'Internal server error');
});

app.listen(port, () =>
  console.log('Successfully running Codelingo on port 8080')
);
