import express from 'express'
import auth from '../../core/middlewares/auth.middleware'
import * as transactionController from './transaction.controller'

const transactionRoutes = express.Router()

const routePrefix = '/transactions'

transactionRoutes.get(`${routePrefix}`, auth, transactionController.getAllFromUserTransaction); 
transactionRoutes.get(`${routePrefix}/currentmonth-balance`, auth, transactionController.getCurrentMonthBalance); 
transactionRoutes.get(`${routePrefix}/general-balance`, auth, transactionController.getGeneralBalance); 
transactionRoutes.post(`${routePrefix}`, auth, transactionController.createTransaction); 

export default transactionRoutes;