import React, {PropTypes} from "react";
import {input} from "./priceInput.css";
import Input from "./labeledInput/LabeledInput";

const PriceInput = ({id, description, onChange}) => {
	const inputConf = {
		type:      "number",
		min:       "0",
		className: input
	};

	return <Input id={id}
								description={description}
								onChange={onChange}
								inputConf={inputConf}/>
};

PriceInput.propTypes = {
	onChange:    PropTypes.func.isRequired,
	id:          PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default PriceInput;
