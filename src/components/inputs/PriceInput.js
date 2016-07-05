import React from "react";
import {input} from "./priceInput.css";
import Input from "./input/Input";

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
	onChange:    React.PropTypes.func.isRequired,
	id:          React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired
};

export default PriceInput;
