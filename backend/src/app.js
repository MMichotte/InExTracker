import express from 'express';
import bodyParser from 'body-parser'
import env from './config/env.js';
import mongoose from 'mongoose';

import userRoutes from './routes/user.routes.js';

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/', userRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});