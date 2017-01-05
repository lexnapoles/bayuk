import React, {Component} from "react";
import SignIn from "./SignIn";

class SignInContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user:  {
				email:    "",
				password: ""
			},
			error: {
				email:    "",
				password: ""
			}
		};

		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getUpdatedUser(newProperty) {
		return {...this.state.user, ...newProperty};
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

	onSubmit() {
		const {email, password} = this.state.user;

		this.props.onSubmit({email, password})
	}

	render() {
		const {email, password} = this.state.user,
					errors            = this.state;

		return (
			<SignIn
				email={email}
				password={password}
				errors={errors}
				onEmailChange={this.onEmailChange}
				onPasswordChange={this.onPasswordChange}
				onSubmit={this.onSubmit}/>
		);
	}
}

SignInContainer.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
};

export default SignInContainer;