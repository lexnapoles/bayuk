import React, {PropTypes} from "react";
import Filter from "../filter/Filter";
import CheckBoxInput  from "../../inputs/CheckBoxInput";

const DistanceFilter = ({onChange, options}) => {
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

DistanceFilter.propTypes = {
	options:  PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
};

export default DistanceFilter;
