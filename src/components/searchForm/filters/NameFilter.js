import React from "react";

import Filter from "./Filter";

const NameFilter = ({name, onChange}) =>
	<Filter name="Name">
		<input id="name" type="text" value={name} placeholder="Name" onChange={onChange} required/>
	</Filter>

NameFilter.propTypes = {
	name:     React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default NameFilter;
