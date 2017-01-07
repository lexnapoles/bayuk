import React, {Component} from "react";
import AuthForm from "./authForm";

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

	onSubmit(event) {
		event.preventDefault();

		// this.props.onSubmit(this.state.user);
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