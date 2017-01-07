import React, {Component} from "react";
import AuthForm from "./authForm";
import errorMsgs from "../../form/errors/errorsMsgs";
import {
	NO_NAME_FILLED,
	NO_EMAIL_FILLED,
	NO_PASSWORD_FILLED
} from "../../form/errors/errorConstants";


class AuthFormContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user:   {
				name:     "",
				email:    "",
				password: ""
			},
			errors: {
				name:     "",
				email:    "",
				password: ""
			}
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getUpdatedUser(newProperty) {
		return {...this.state.user, ...newProperty};
	}

	onNameChange(event) {
		const user = this.getUpdatedUser({
			name: event.target.value
		});

		this.setState({user});
	}

	onEmailChange(event) {
		const user = this.getUpdatedUser({
			email: event.target.value
		});

		this.setState({user});
	}

	onPasswordChange(event) {
		const user = this.getUpdatedUser({
			password: event.target.value
		});

		this.setState({user});
	}

	errorExists(errors) {
		return Object.keys(errors).some(key => errors[key].length);
	}

	validateName(name) {
		return name.length
			? ""
			: errorMsgs[NO_NAME_FILLED];
	}


	validateEmail(email) {
		return email.length
			? ""
			: errorMsgs[NO_EMAIL_FILLED];
	}

	validatePassword(password) {
		return password.length
			? ""
			: errorMsgs[NO_PASSWORD_FILLED];
	}

	validate({name, email, password}) {
		const errors = {
			name:     this.props.signIn ? "" : this.validateName(name),
			email:    this.validateEmail(email),
			password: this.validatePassword(password)
		};


		if (this.errorExists(errors)) {
			this.setState({errors});

			return false;
		}

		return true;
	}


	onSubmit(event) {
		event.preventDefault();

		const user = this.state.user;

		if (!this.validate(user)) {
			return;
		}

		this.props.onSubmit(user);
	}

	render() {
		const {name, email, password}   = this.state.user,
					{errors}                  = this.state,
					{signIn, formName}        = this.props;

		return (
			<AuthForm
				formName={formName}
				name={signIn ? name : void 0}
				email={email}
				password={password}
				errors={errors}
				onNameChange={signIn ? this.onNameChange : void 0}
				onEmailChange={this.onEmailChange}
				onPasswordChange={this.onPasswordChange}
				onSubmit={this.onSubmit}/>
		);
	}
}

AuthFormContainer.propTypes = {
	formName: React.PropTypes.string.isRequired,
	signIn: 	React.PropTypes.bool,
	onSubmit: React.PropTypes.func.isRequired
};

AuthFormContainer.defaultProps = {
	signIn: false
};

export default AuthFormContainer;