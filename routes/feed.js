const express = require('express');
const cors = require('cors');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', cors(), feedController.getPosts);

router.post('/post', feedController.postPost);

module.exports = router;
