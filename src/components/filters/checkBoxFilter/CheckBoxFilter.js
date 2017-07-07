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

const OptionsFilter = ({title, isFetching, onChange, options, error}) =>
	<Filter title={title} error={error}>
		{isFetching ? <Spinner/> : renderOptions(options, onChange)}
	</Filter>;

OptionsFilter.propTypes = {
	title:      PropTypes.string.isRequired,
	isFetching: PropTypes.bool,
	onChange:   PropTypes.func.isRequired,
	options:    PropTypes.object.isRequired,
	error:      PropTypes.string
};

OptionsFilter.defaultProps = {
	isFetching: false
};

export default OptionsFilter ;

