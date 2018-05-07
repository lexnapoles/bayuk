import React from "react";
import { connect } from "react-redux";
import { logInUser } from "../../actions/api";
import AuthFormContainer from "./authForm/AuthFormContainer";

const LogIn = props => <AuthFormContainer formName="Log In" logIn {...props} />;

export default connect(undefined, {
  onSubmit: logInUser
})(LogIn);
