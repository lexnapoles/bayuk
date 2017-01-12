import React from "react";
import {connect} from "react-redux"
import {registerUser} from "../../actions/api";
import AuthFormContainer from "./authForm/AuthFormContainer";

const Register = props => <AuthFormContainer formName="Create Account" logIn={false} {...props}/>;

export default connect(void 0, {
	onSubmit: registerUser
})(Register);
