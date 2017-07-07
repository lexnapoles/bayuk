import PropTypes from 'prop-types';
import React from "react";
import CheckBoxFilterContainer from "../checkBoxFilter/CheckBoxFilterContainer";

const options = ["Expensive",	"Cheap", "Distance", "New"];

const SortFilter = ({onChange}) => <CheckBoxFilterContainer title="Sort By" options={options} onChange={onChange}/>;

SortFilter.propTypes = {
	onChange: PropTypes.func.isRequired
};

export default SortFilter;
