import passport from "passport";
import {Strategy} from "passport-local";
import {getCredentials, getUser} from "./services/user";
import {validPassword} from "./services/authentication";

passport.use(new Strategy({usernameField: "email"}, (username, password, done) => {
	getCredentials(username)
		.then(validPassword.bind(void 0, password))
		.then(getUser.bind(void 0, username))
		.then(user => done(null, user))
		.catch(() => done(null, false, {
			message: "Incorrect email or password"
		}))
}));