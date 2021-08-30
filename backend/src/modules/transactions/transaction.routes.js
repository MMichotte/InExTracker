import express from 'express'
import auth from '../../core/middlewares/auth.middleware'

const transactionRoutes = express.Router()

const routePrefix = '/transactions'

transactionRoutes.get(`${routePrefix}`, auth, (req, res)=>{ res.send('//Todo!')}); 

export default transactionRoutes;