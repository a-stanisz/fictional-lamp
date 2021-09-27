const { v4: uuidv4 } = require('uuid');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: 'Lorem',
        content: 'Ipsum dolor',
      },
    ],
  });
};

exports.postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content);
  // Create post in db
  res.status(201).json({
    message: 'Post created!',
    post: {
      id: uuidv4(),
      title: title,
      content: content,
    },
  });
};
