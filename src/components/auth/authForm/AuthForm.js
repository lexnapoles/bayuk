import React from "react";
import TextInput from "../../inputs/textInput/TextInput";
import {container, formContainer, title, inputs, submitButton} from "./authForm.css";

const AuthForm = ({form, formName, onNameChange, onEmailChange, onPasswordChange, onSubmit, errors, logIn}) =>
	<div className={container}>
		<form className={formContainer} onSubmit={onSubmit}>
			<h1 className={title}>{formName}</h1>
			{ logIn
				? void 0
				:	<TextInput value={form.name} placeholder="Name" onChange={onNameChange} className={inputs} error={errors.name}/>
			}
			<TextInput value={form.email} placeholder="Email" onChange={onEmailChange} className={inputs} error={errors.email}/>
			<TextInput value={form.password} placeholder="Password" onChange={onPasswordChange} className={inputs} error={errors.password}/>
			<button type="submit" className={submitButton}>{formName}</button>
		</form>
	</div>;


AuthForm.propTypes = {
	formName:         React.PropTypes.string.isRequired,
	onEmailChange:    React.PropTypes.func.isRequired,
	onPasswordChange: React.PropTypes.func.isRequired,
	onSubmit:         React.PropTypes.func.isRequired,
	errors:           React.PropTypes.object.isRequired,
	form:             React.PropTypes.object.isRequired,
	onNameChange:     React.PropTypes.func,
	logIn:            React.PropTypes.bool
};

AuthForm.defaultProps = {
	logIn: false
};

export default AuthForm;