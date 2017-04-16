import passport from "passport";
import {Strategy} from "passport-local";
import {getCredentials, getUserByEmail} from "./services/users";
import {validPassword} from "./services/authentication";
import {loginFailed} from "./controllers/users/errors";

passport.use(new Strategy({usernameField: "email"}, (username, password, done) => {
	getCredentials(username)
		.then(validPassword.bind(void 0, password))
		.then(getUserByEmail.bind(void 0, username))
		.then(user => done(null, user))
		.catch(() => done(null, false, loginFailed()))
}));