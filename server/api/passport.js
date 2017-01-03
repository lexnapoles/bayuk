import passport from "passport";
import {Strategy} from "passport-local";
import {getUser, validPassword} from "./services/user";

passport.use(new Strategy({usernameField: "email"}, (username, password, done) => {
	let user = {};

	getUser(username)
		.then(userData => user = userData, user)
		.then(({hash, salt}) => ({hash, salt}))
		.then(validPassword.bind(void 0, password))
		.then(() => done(null, {
			email: user.email,
			name: user.name
		}))
		.catch(() => done(null, false, {
			message: "Incorrect email or password"
		}))
}));