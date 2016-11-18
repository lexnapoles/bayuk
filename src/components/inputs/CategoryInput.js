import React from "react";
import Input from "./labeledInput/LabeledInput";

const CategoryInput = ({id, description, onChange, checked}) => {
	const inputConf = {
		type: "checkbox",
		checked
	};

	return <Input id={id}
								description={description}
								onChange={onChange}
								inputConf={inputConf}/>
};

CategoryInput.propTypes = {
	onChange:    React.PropTypes.func.isRequired,
	id:          React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	checked:     React.PropTypes.bool.isRequired
};

export default CategoryInput;
