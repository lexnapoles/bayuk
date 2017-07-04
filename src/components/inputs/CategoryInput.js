import React, {PropTypes} from "react";
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
	onChange:    PropTypes.func.isRequired,
	id:          PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	checked:     PropTypes.bool.isRequired
};

export default CategoryInput;
