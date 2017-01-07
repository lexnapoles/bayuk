import React from "react";
import {container} from "./textFilter.css";
import Filter from "../filter/Filter";
import TextInput from "../../inputs/textInput/TextInput";

const TextFilter = ({name, error, placeholder, onChange}) =>
	<Filter error={error}>
		<div className={container}>
			<TextInput value={name} placeholder={placeholder} onChange={onChange}/>
		</div>
	</Filter>;

TextFilter.propTypes = {
	name:        React.PropTypes.string.isRequired,
	error:       React.PropTypes.string,
	placeholder: React.PropTypes.string,
	onChange:    React.PropTypes.func.isRequired
};

export default TextFilter;
