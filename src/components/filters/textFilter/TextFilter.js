import PropTypes from 'prop-types';
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
	name:        PropTypes.string.isRequired,
	onChange:    PropTypes.func.isRequired,
	error:       PropTypes.string,
	placeholder: PropTypes.string
};

export default TextFilter;
