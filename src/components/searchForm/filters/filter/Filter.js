import React from "react";
import {filter, label} from "./filter.css";

const Filter = ({title, children}) =>
	<div className={filter}>
		<label className={label}>{title}</label>
		<hr/>
		<div>
			{children}
		</div>
	</div>

Filter.propTypes = {
	title:    React.PropTypes.string.isRequired,
	children: React.PropTypes.node.isRequired
}

export default Filter;
