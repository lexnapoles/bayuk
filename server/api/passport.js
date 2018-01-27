import passport from 'passport';
import { Strategy } from 'passport-local';
import { getCredentials, getUserByEmail } from './services/users';
import { validPassword } from './services/authentication';
import { loginFailed } from '../errors/api/userErrors';

const authenticate = async function authenticate(email, password, done) {
  try {
    const userCredentials = await getCredentials(email);

    await validPassword(password, userCredentials);

    const user = await getUserByEmail(email);

    done(null, user);
  } catch (e) {
    done(null, false, loginFailed());
  }
};

passport.use(new Strategy({ usernameField: 'email' }, authenticate));
