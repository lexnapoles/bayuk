import PropTypes from 'prop-types';
import React from "react";
import CheckBoxFilterContainer from "../checkBoxFilter/CheckBoxFilterContainer";

const options = ["1km", "5km", "10km", ">10km"];

const DistanceFilter = ({onChange}) => <CheckBoxFilterContainer title="Distance" options={options} onChange={onChange}/>;

DistanceFilter.propTypes = {
	onChange:  PropTypes.func.isRequired
};

export default DistanceFilter;
