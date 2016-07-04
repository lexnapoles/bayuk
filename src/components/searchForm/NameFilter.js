import React, {Component} from "react";

import Filter from "./Filter";

class NameFilter extends Component {
	render() {
		return (
			<Filter name="Name">
				<input id="name" type="text" value={this.props.name} placeholder="Name" onChange={this.props.onChange} required/>
			</Filter>
		);
	}
}

NameFilter.propTypes = {
	name:     React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
}

export default NameFilter;
