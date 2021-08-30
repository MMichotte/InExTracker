import User from './user.model'
import * as userService from './user.service'
import * as bcryptService from '../../core/services/bcrypt.service'

async function loginUser(req, res) {

  if (!req.body.email || !req.body.password) {
    res.status(400).send();
    return;
  }

  await userService.findOneByEmail(req.body.email)
    .then(async existingUser => {
      if (!existingUser) {
        res.status(401).send('Wrong email or password');
      } else {
        const validPassword = await bcryptService.comparePassword(req.body.password, existingUser.password);
        if (validPassword) {
          //TODO -> return JWT
          res.status(200).send('Successfully logged-in');
        } else {
          res.status(401).send('Wrong email or password');
        }
      }
    })
    .catch(err => {
      console.log("Error : ", err.message);
      res.status(500).send(err.message);
    });

}

async function registerUser(req, res) {

  //TODO ad more validation!
  if (!req.body.email || !req.body.password) {
    res.status(400).send();
    return;
  }

  const newUser = new User({
    email: req.body.email,
    password: await bcryptService.hashPassword(req.body.password)
  });

  await userService.findOneByEmail(newUser.email)
    .then(async existingUser => {
      if (!existingUser) {

        await userService.createOneUser(newUser)
          .then(() => {
            res.status(200).send(newUser);
          })
          .catch(err => {
            console.log("Error is ", err.message);
            res.status(400).send(err.message);
          });
      }
      else {
        res.status(400).send('User already exists');
      }
    })
    .catch(err => {
      console.log("Error : ", err.message);
      res.status(500).send(err.message);
    });

}

export { loginUser, registerUser }