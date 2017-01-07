import React from "react";
import TextInput from "../inputs/textInput/TextInput";
import {container, formContainer, title, inputs, submitButton} from "./createAccount.css";

const CreateAccount = ({name, email, password, onNameChange, onEmailChange, onPasswordChange, onSubmit, errors}) =>
	<div className={container}>
		<form className={formContainer} onSubmit={onSubmit} >
			<h1 className={title}>Create Account</h1>
			<TextInput value={name} placeholder="Name" onChange={onNameChange} className={inputs} error={errors.name}/>
			<TextInput value={email} placeholder="Email" onChange={onEmailChange} className={inputs} error={errors.email}/>
			<TextInput value={password} placeholder="Password" onChange={onPasswordChange} className={inputs} error={errors.password}/>
			<button type="submit" className={submitButton}>Create Account</button>
		</form>
	</div>;

CreateAccount.propTypes = {
	name:             React.PropTypes.string.isRequired,
	email:            React.PropTypes.string.isRequired,
	password:         React.PropTypes.string.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onEmailChange:    React.PropTypes.func.isRequired,
	onPasswordChange: React.PropTypes.func.isRequired,
	onSubmit:         React.PropTypes.func.isRequired,
	errors:						React.PropTypes.object.isRequired
};

export default CreateAccount;