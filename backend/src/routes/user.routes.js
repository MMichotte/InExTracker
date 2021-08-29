import express from 'express'
import createError from 'http-errors'
import User from '../models/user.model.js'
import * as bcryptService from '../services/bcrypt.service.js'

const userRoutes = express.Router()

userRoutes.get('/users', async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

userRoutes.post('/login', async (req, res, next) => {
  const existingUser = await User.findOne({email: req.body.email});
  
  if (!existingUser) {
    res.status(401).send('Wrong email or password');
    return;
  }

  const validPassword = await bcryptService.comparePassword(req.body.password, existingUser.password);

  if (!validPassword) {
    res.status(401).send('Wrong email or password');
    return;
  }

  //TODO -> return JWT
  res.status(200).send('Successfully logged-in');

});

userRoutes.post('/signup', async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: await bcryptService.hashPassword(req.body.password)
  });
  await newUser
    .save()
    .then(() => {
      res.status(200).send(newUser);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

export default userRoutes;