const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const port = 7545 || process.env.PORT;
const app = express();

app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

// app.use('/api', require('./api'));

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
