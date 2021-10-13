const express = require('express');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

const startup = async () => {
  const PORT = process.env.PORT;
  const DB_CONN_STR = process.env.DB_CONN_STR;
  console.log('Hello');
  mongoose
    .connect(DB_CONN_STR)
    .then(() => {
      console.log('Connected to the database')
      app.listen(PORT);
      console.log(`Connected at port: ${PORT}!`);
    })
    .catch(error => error);
};

startup().catch((error) => console.log(error));
