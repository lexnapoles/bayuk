import React from "react";
import {filter, invalidFilter, errorText, label} from "./filter.css";

const Filter = ({title, error, children}) =>
	<div className={error.length ? invalidFilter : filter}>
		{title && title.length ? <div><label className={label}>{title}</label><hr/></div>	: ""}
		<div>
			{children}
		</div>
		{error && error.length ? <p className={errorText}>{error}</p> : ""}
	</div>

Filter.propTypes = {
	title:    React.PropTypes.string,
	error:    React.PropTypes.string,
	children: React.PropTypes.node.isRequired
}

export default Filter;
