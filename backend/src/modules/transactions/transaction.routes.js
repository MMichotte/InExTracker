import express from 'express'
import auth from '../../core/middlewares/auth.middleware'
import * as transactionController from './transaction.controller'

const transactionRoutes = express.Router()

const routePrefix = '/transactions'

transactionRoutes.get(`${routePrefix}`, auth, transactionController.getAllFromUserTransaction); 
transactionRoutes.get(`${routePrefix}/:yearMonth`, auth, transactionController.getAllFromUserByMonthTransaction); 
transactionRoutes.get(`${routePrefix}/currentmonth-balance/:yearMonth`, auth, transactionController.getCurrentMonthBalance); 
transactionRoutes.get(`${routePrefix}/general-balance/:yearMonth`, auth, transactionController.getGeneralBalance); 
transactionRoutes.post(`${routePrefix}`, auth, transactionController.createTransaction); 
transactionRoutes.delete(`${routePrefix}`, auth, transactionController.deleteTransaction); 

export default transactionRoutes;