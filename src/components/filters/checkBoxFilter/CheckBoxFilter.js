import PropTypes from 'prop-types';
import React from "react";
import Filter from "../filter/Filter";
import Spinner from "../../spinner/Spinner";
import CheckBoxInput  from "../../inputs/CheckBoxInput";

const renderOptions = (options, onChange) => {
	const optionNames = Object.keys(options);

	return optionNames.map(name =>
		<CheckBoxInput key={name}
										id={name}
										description={name}
										checked={options[name]}
										onChange={onChange}/>
	);
};

const OptionsFilter = ({title, onChange, options, error}) =>
	<Filter title={title} error={error}>
		{Object.keys(options).length ? renderOptions(options, onChange) : <Spinner/> }
	</Filter>;

OptionsFilter.propTypes = {
	title:    PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	options:  PropTypes.object.isRequired,
	error:    PropTypes.string
};

export default OptionsFilter ;

