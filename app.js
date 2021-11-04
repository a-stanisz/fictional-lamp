const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const startup = async () => {
  const PORT = process.env.PORT;
  const DB_CONN_STR = process.env.DB_CONN_STR;
  console.log('Startup...');
  mongoose
    .connect(DB_CONN_STR)
    .then(() => {
      console.log('Connected to the database');
      app.listen(PORT);
      console.log(`Connected at port: ${PORT}!`);
    })
    .catch((error) => {
      console.log('...failed');
      console.log(error);
    });
};

startup()
