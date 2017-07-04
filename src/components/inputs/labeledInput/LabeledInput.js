import React, {PropTypes} from "react";
import {container, title} from "./LabeledInput.css";

const LabeledInput = ({id, description, onChange, inputConf}) =>
	<div className={container}>
		<label className={title} htmlFor={id}>{description}</label>
		<input id={id} {...inputConf} onChange={onChange} />
	</div>

LabeledInput.propTypes = {
	onChange:    PropTypes.func.isRequired,
	id:          PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	inputConf:   PropTypes.object
};

export default LabeledInput;
