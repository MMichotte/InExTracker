import express from 'express';
import bodyParser from 'body-parser'
import env from './config/env';
import mongoose from 'mongoose';

import userRoutes from './modules/users/user.routes';

const app = express();
const port = process.env.PORT || 3000;

// DATABASE CONNECTION
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

// ROUTING
app.use('/api/', [userRoutes]);

// SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});