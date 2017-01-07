import React from "react";
import TextInput from "../../inputs/textInput/TextInput";
import {container, formContainer, title, inputs, submitButton} from "./authForm.css";

const LoginForm = ({formName, name, email, password, onNameChange, onEmailChange, onPasswordChange, onSubmit, errors}) =>
	<div className={container}>
		<form className={formContainer} onSubmit={onSubmit}>
			<h1 className={title}>{formName}</h1>
			{name
				?	<TextInput value={name} placeholder="Name" onChange={onNameChange} className={inputs} error={errors.name}/>
				: void 0
			}
			<TextInput value={email} placeholder="Email" onChange={onEmailChange} className={inputs} error={errors.email}/>
			<TextInput value={password} placeholder="Password" onChange={onPasswordChange} className={inputs} error={errors.password}/>
			<button type="submit" className={submitButton}>{formName}</button>
		</form>
	</div>;

LoginForm.propTypes = {
	formName:					React.PropTypes.string.isRequired,
	name:             React.PropTypes.string,
	email:            React.PropTypes.string.isRequired,
	password:         React.PropTypes.string.isRequired,
	onNameChange:     React.PropTypes.func,
	onEmailChange:    React.PropTypes.func.isRequired,
	onPasswordChange: React.PropTypes.func.isRequired,
	onSubmit:         React.PropTypes.func.isRequired,
	errors:           React.PropTypes.object.isRequired
};

export default LoginForm;