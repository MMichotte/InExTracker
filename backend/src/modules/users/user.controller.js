import User from './user.model'
import * as userService from './user.service'
import * as bcryptService from '../../core/services/bcrypt.service'
import generateJWT from '../../core/services/jwt.service'


async function loginUser(req, res) {
  // #swagger.tags = ['Auth']

  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send();
    return;
  }

  await userService.findOneByEmail(email)
    .then(async existingUser => {
      if (!existingUser) {
        res.status(401).send('Wrong email or password');
      } else {
        const validPassword = await bcryptService.comparePassword(password, existingUser.password);
        if (validPassword) {
          //TODO -> return JWT
          const jwt = generateJWT(existingUser._id, existingUser.email);
          res.status(200).send(jwt);
        } else {
          res.status(401).send('Wrong email or password');
        }
      }
    })
    .catch(err => {
      console.log("Error : ", err.message);
      res.status(400).send(err.message);
    });

}

async function registerUser(req, res) {
  // #swagger.tags = ['Users']

  const { email, password } = req.body;

  //TODO ad more validation!
  if (!(email && password)) {
    res.status(400).send();
    return;
  }

  const newUser = new User({
    email: email,
    password: await bcryptService.hashPassword(password)
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
        res.status(409).send('User already exists, please login');
      }
    })
    .catch(err => {
      console.log("Error : ", err.message);
      res.status(400).send(err.message);
    });

}

export { loginUser, registerUser }