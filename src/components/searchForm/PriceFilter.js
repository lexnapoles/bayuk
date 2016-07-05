import React from "react";

import Filter from "./Filter";

const PriceFilter = ({onChange}) =>
	<Filter name="Price">
		<div >
			<label htmlFor="min">Min price</label>
			<input id="min" type="number" min="0" onChange={onChange} required/>
		</div>
		<div>
			<label htmlFor="max">Max price</label>
			<input id="max" type="number" min="0" onChange={onChange} required/>
		</div>
	</Filter>

PriceFilter.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default PriceFilter;
