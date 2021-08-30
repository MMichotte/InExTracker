import jwt from 'jsonwebtoken';
import env from '../../config/env'

export default function verifyToken(req, res, next) {

  const token =
    req.body.token || req.query.token || req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, env.JWT_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
}
