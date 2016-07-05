import React from "react";
import {container, title} from "./input.css";

const Input = ({id, description, onChange, inputConf}) =>
	<div className={container}>
		<label className={title} htmlFor={id}>{description}</label>
		<input id={id} {...inputConf} onChange={onChange} required/>
	</div>

Input.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	inputConf: React.PropTypes.object
};

export default Input;
