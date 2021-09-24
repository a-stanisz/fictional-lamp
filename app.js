const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(express.json());

app.use('/feed', feedRoutes);

const startup = async () => {
  const PORT = process.env.PORT;
  console.log('Hello');
  app.listen(PORT);
  console.log(`Connected at port: ${PORT}!`);
}

startup().catch(error => console.log(error));
