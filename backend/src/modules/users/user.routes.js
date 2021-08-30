import express from 'express'
import * as userController from './user.controller'

const userRoutes = express.Router()

const routePrefix = '/users'

userRoutes.post(`/login`, userController.loginUser);
userRoutes.post(`${routePrefix}/signup`, userController.registerUser);

export default userRoutes;