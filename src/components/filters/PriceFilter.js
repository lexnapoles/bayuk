import PropTypes from 'prop-types';
import React from "react";
import Filter from "./filter/Filter";
import PriceInput from "../inputs/PriceInput";

const PriceFilter = ({onChange}) =>
	<Filter title="Price">
		<PriceInput id="min" description="From" onChange={onChange}/>
		<PriceInput id="max" description="To" onChange={onChange}/>
	</Filter>

PriceFilter.propTypes = {
	onChange: PropTypes.func.isRequired
};

export default PriceFilter;
