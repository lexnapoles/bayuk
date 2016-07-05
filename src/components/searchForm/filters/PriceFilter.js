import React from "react";
import Filter from "./Filter";
import PriceInput from "../../inputs/PriceInput";

const PriceFilter = ({onChange}) =>
	<Filter name="Price">
		<PriceInput id="min" description="Min Price" onChange={onChange}/>
		<PriceInput id="max" description="Max Price" onChange={onChange}/>
	</Filter>

PriceFilter.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default PriceFilter;
