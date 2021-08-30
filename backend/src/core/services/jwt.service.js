import env from '../../config/env';
import jwt from 'jsonwebtoken'

function generateJWT(email, userId) {
  return jwt.sign(
    {
      user_id: userId,
      email: email
    },
    env.JWT_KEY,
    {
      expiresIn: '7d'
    });
}

function decodeJWT(token) {
  return jwt.decode(token);
}

export {generateJWT, decodeJWT }