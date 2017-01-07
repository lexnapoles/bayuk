import React, {Component} from "react";
import CreateAccount from "./CreateAccount";

class CreateAccountContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user:  {
				name:     "",
				email:    "",
				password: ""
			},
			errors: {
				name: 		"",
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
		const {name, email, password} = this.state.user,
					{errors}                  = this.state;

		return (
			<CreateAccount
				name={name}
				email={email}
				password={password}
				errors={errors}
				onNameChange={this.onNameChange}
				onEmailChange={this.onEmailChange}
				onPasswordChange={this.onPasswordChange}
				onSubmit={this.onSubmit}/>
		);
	}
}

CreateAccountContainer.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
};

export default CreateAccountContainer;