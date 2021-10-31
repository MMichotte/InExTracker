/* eslint-disable no-undef */
const helmet = require("helmet");
const permissionsPolicy = require('permissions-policy');
import express from 'express';
import bodyParser from 'body-parser'
import env from './config/env';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';
import * as path from 'path';

import userRoutes from './modules/users/user.routes';
import transactionRoutes from './modules/transactions/transaction.routes';

const __dirname = path.resolve();

const app = express();
const port = env.PORT;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'default-src': ['\'self\'', '\'unsafe-inline\'', 'blob:'],
    'object-src': ['\'self\'', '\'unsafe-inline\'', 'data:'],
    'img-src': ['\'self\'', '\'unsafe-inline\'', 'data:'],
    'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
    'script-src-attr': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
  }
}));
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(permissionsPolicy({
  features: {
    fullscreen: ['self']
  }
}));

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
  
  
  app.use(express.static('../public/dist/frontend'))
  app.set('view engine', 'pug');
  
  app.get('/', (req, res) => {
      res.sendFile('index.html',{root:__dirname})
  });

// SWAGGER
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// ROUTING
app.use('/api/', [userRoutes, transactionRoutes]);

// SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});