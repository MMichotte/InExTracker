import env from '../../config/env';
import jwt from 'jsonwebtoken'

export default function generateJWT(email, userId) {
  return jwt.sign(
    {
      user_id: userId,
      email
    },
    env.JWT_KEY,
    {
      expiresIn: '7d'
    });
}
