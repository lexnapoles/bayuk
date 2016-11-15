import React from "react";
import {filter, errorText, label, invalidFilter} from "./filter.css";

const Filter = ({title, error, children}) =>
	<div className={error.length ? invalidFilter : filter}>
		{title.length ? <div><label className={label}>{title}</label><hr/></div>	: ""}
		<div>
			{children}
		</div>
		{error.length ? <p className={errorText}>{error}</p> : ""}
	</div>

Filter.propTypes = {
	title:    React.PropTypes.string.isRequired,
	error:    React.PropTypes.string.isRequired,
	children: React.PropTypes.node.isRequired
}

export default Filter;
