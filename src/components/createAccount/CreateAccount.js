import React from "react";
import Form from "../form/Form";
import TextFilter from "../filters/textFilter/TextFilter";

const CreateAccount = ({name, email, password, repeatedPassword, onNameChange, onEmailChange, onPasswordChange, onRepeatedPasswordChange, onSubmit}) =>
	<div>
		<Form title="Create Account" formName="createAccount" onSubmit={onSubmit}>
			<TextFilter name={name} placeholder="Name" onChange={onNameChange}/>
			<TextFilter name={email} placeholder="Email" onChange={onEmailChange}/>
			<TextFilter name={password} placeholder="Password" onChange={onPasswordChange}/>
			<TextFilter name={repeatedPassword} placeholder="Repeat Password" onChange={onRepeatedPasswordChange}/>
		</Form>
	</div>;

CreateAccount.propTypes = {
	name:                     React.PropTypes.string.isRequired,
	email:                    React.PropTypes.string.isRequired,
	password:                 React.PropTypes.string.isRequired,
	repeatedPassword:         React.PropTypes.string.isRequired,
	onNameChange:             React.PropTypes.func.isRequired,
	onEmailChange:            React.PropTypes.func.isRequired,
	onPasswordChange:         React.PropTypes.func.isRequired,
	onRepeatedPasswordChange: React.PropTypes.func.isRequired,
	onSubmit:                 React.PropTypes.func.isRequired
};

export default CreateAccount;