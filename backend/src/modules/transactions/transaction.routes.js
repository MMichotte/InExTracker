import express from 'express'
import auth from '../../core/middlewares/auth.middleware'
import * as transactionController from './transaction.controller'

const transactionRoutes = express.Router()

const routePrefix = '/transactions'

transactionRoutes.get(`${routePrefix}`, auth, transactionController.getAllFromUserTransaction); 
transactionRoutes.post(`${routePrefix}`, auth, transactionController.createTransaction); 

export default transactionRoutes;