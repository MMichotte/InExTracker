import express from 'express';
import bodyParser from 'body-parser'
import env from './config/env';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

import userRoutes from './modules/users/user.routes';
import transactionRoutes from './modules/transactions/transaction.routes';

const app = express();
const port = env.PORT;

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

// SWAGGER
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// ROUTING
app.use('/api/', [userRoutes, transactionRoutes]);

// SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});