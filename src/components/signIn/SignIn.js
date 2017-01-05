import React from "react";
import Form from "../form/Form";
import TextFilter from "../filters/textFilter/TextFilter";

const SignIn = ({email, password, onEmailChange, onPasswordChange, onSubmit}) =>
	<div>
		<Form title="Sign In" formName="signIn" onSubmit={onSubmit}>
			<TextFilter name={email} placeholder="Email" onChange={onEmailChange}/>
			<TextFilter name={password} placeholder="Password" onChange={onPasswordChange}/>
		</Form>
	</div>;


SignIn.propTypes = {
	email:            React.PropTypes.string.isRequired,
	password:         React.PropTypes.string.isRequired,
	onEmailChange:    React.PropTypes.func.isRequired,
	onPasswordChange: React.PropTypes.func.isRequired,
	onSubmit:         React.PropTypes.func.isRequired
};

export default SignIn;