const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'Lorem ipsum',
        content: 'Ipsum dolor',
        imageUrl: 'images/quantum-cat.jpg',
        creator: {
          name: 'Adam',
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    imageUrl: 'images/quantum-cat.jpg',
    content: content,
    creator: {
      name: 'Adam',
    },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Post created!',
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(title, content);
  // Create post in db
};
