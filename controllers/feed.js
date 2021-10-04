const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator/check');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'Lorem',
        content: 'Ipsum dolor',
        imageUrl: 'images/duck.png',
        creator: {
          name: 'Adam',
        },
        createdAt: new Date()
      },
    ],
  });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation error',
      errors: errors.array()
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content);
  // Create post in db
  res.status(201).json({
    message: 'Post created!',
    post: {
      _id: uuidv4(),
      title: title,
      content: content,
      creator: {
        name: 'Adam',
      },
      createdAt: new Date()
    },
  });
};
