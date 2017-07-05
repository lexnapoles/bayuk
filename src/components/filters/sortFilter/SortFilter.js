import PropTypes from 'prop-types';
import React from "react";
import Filter from "../filter/Filter";
import CheckBoxInput  from "../../inputs/CheckBoxInput";

const SortFilter = ({onChange, options}) => {
	const renderDistanceOptions = options => {
		const distanceOptions = Object.keys(options);

		return distanceOptions.map(name =>
			<CheckBoxInput key={name}
											id={name}
											description={name}
											checked={options[name]}
											onChange={onChange}/>
		);
	};

	return (
		<Filter title="Distance">
			{renderDistanceOptions(options)}
		</Filter>
	);
};

SortFilter .propTypes = {
	options:  PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
};

export default SortFilter ;
