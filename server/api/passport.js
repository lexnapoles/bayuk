import passport from 'passport';
import { Strategy } from 'passport-local';
import { getCredentials, getUserByEmail } from './services/users';
import { validPassword } from './services/authentication';
import { loginFailed } from '../errors/api/userErrors';

passport.use(new Strategy({ usernameField: 'email' }, (email, password, done) => {
  getCredentials(email)
    .then(validPassword.bind(undefined, password))
    .then(getUserByEmail.bind(undefined, email))
    .then(user => done(null, user))
    .catch(() => done(null, false, loginFailed()));
}));
