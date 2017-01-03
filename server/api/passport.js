import passport from "passport";
import {LocalStrategy} from "passport-local";
import {getUser, validPassword} from "./services/user";

passport.use(new LocalStrategy({usernameFiled: "email"}, function(email, password, done) {
	let user = {};

	getUser(email)
		.then(userData => user = userData, user)
		.then(({hash, salt}) => ({hash, salt}))
		.then(validPassword.bind(void 0, password))
		.catch(() => done(null, false, {
			message: "Incorrect email or password"
		}))
		.then(() => done(null, user))
}));