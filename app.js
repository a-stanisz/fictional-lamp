const path = require('path');

const { v4: uuidv4 } = require('uuid');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'
    ||
    file.mimetype === 'image/jpg'
    ||
    file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter })
  .single('image'));
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
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
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
