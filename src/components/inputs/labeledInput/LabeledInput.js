import React from "react";
import {container, title} from "./LabeledInput.css";

const LabeledInput = ({id, description, onChange, inputConf}) =>
	<div className={container}>
		<label className={title} htmlFor={id}>{description}</label>
		<input id={id} {...inputConf} onChange={onChange} />
	</div>

LabeledInput.propTypes = {
	onChange:    React.PropTypes.func.isRequired,
	id:          React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	inputConf:   React.PropTypes.object
};

export default LabeledInput;
