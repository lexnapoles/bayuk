import React, {Component} from "react";

import Filter from "./Filter";

class PriceFilter extends Component {
	render() {
		const {onChange} = this.props;

		return (
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
		);
	}
}

PriceFilter.propTypes = {
	onChange: React.PropTypes.func.isRequired
}

export default PriceFilter;
