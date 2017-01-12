import React from "react";
import {input, invalidInput, errorText, underline} from "./textInput.css";

const TextInput = ({value, placeholder, onChange, className, error}) =>
	<div className={className}>
		<input className={error.length ? invalidInput : input}
						type="text"
						value={value}
						placeholder={placeholder}
						onChange={onChange}/>
		<hr className={underline}/>
		{error.length ? <p className={errorText}>{error}</p> : void 0}
	</div>;

TextInput.propTypes = {
	value:       React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	onChange:    React.PropTypes.func.isRequired,
	className: 	 React.PropTypes.string,
	error: 			 React.PropTypes.string
};

TextInput.defaultProps = {
	error: ""
};

export default TextInput;