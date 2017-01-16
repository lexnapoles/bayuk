import React from "react";
import TextInput from "../../inputs/textInput/TextInput";
import {authContainer, auth, formContainer, title, inputsContainer, inputs, submitButton} from "./authForm.css";

const AuthForm = ({form, formName, onNameChange, onEmailChange, onPasswordChange, onSubmit, errors, logIn}) =>
	<div className={authContainer}>
		<div className={auth}>
			<form className={formContainer} onSubmit={onSubmit}>
				<h1 className={title}>{formName}</h1>
				<div className={inputsContainer}>
					{ logIn
						? void 0
						:	<TextInput value={form.name} placeholder="Name" onChange={onNameChange} className={inputs} error={errors.name}/>
					}
					<TextInput value={form.email} placeholder="Email" onChange={onEmailChange} className={inputs} error={errors.email}/>
					<TextInput value={form.password} placeholder="Password" onChange={onPasswordChange} className={inputs} error={errors.password}/>
				</div>
				<button type="submit" className={submitButton}>{formName}</button>
			</form>
		</div>
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