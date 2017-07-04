import React, {PropTypes, Component} from "react";
import {omit} from "lodash/object";
import {connect} from "react-redux"
import {registerUser} from "../../actions/api";
import AuthFormContainer from "./authForm/AuthFormContainer";

const DEFAULT_MADRID_COORDS = {
	latitude:  40.416,
	longitude: 3.7
};

class Register extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(formData) {
		const success = ({coords}) => {
			const user = {
				...formData,
				latitude:  coords.latitude,
				longitude: coords.longitude
			};

			this.props.onSubmit(user);
		};

		const error = () => this.props.onSubmit({...formData, ...DEFAULT_MADRID_COORDS});

		navigator.geolocation.getCurrentPosition(success, error);
	}

	render() {
		const props = {
			...omit(this.props, "onSubmit"),
			onSubmit: this.onSubmit
		};

		return <AuthFormContainer formName="Create Account" logIn={false} {...props}/>
	}
}

Register.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default connect(void 0, {
	onSubmit: registerUser
})(Register);
