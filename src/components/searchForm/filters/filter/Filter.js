import React from "react";
import {filter, title} from "./filter.css";

const Filter = ({name, children}) =>
	<div className={filter}>
		<label className={title}>{name}</label>
		<hr/>
		<div>
			{children}
		</div>
	</div>

Filter.propTypes = {
	name:     React.PropTypes.string,
	children: React.PropTypes.node
}

export default Filter;
