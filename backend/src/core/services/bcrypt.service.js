
import * as bcrypt from 'bcrypt';

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword(enteredPassword, dbPassword) {
  const match = await bcrypt.compare(enteredPassword, dbPassword);
  return match;
}

export { hashPassword, comparePassword }