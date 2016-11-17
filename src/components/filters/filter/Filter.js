import React from "react";
import {filter, invalidFilter, errorText, label} from "./filter.css";

const Filter = ({title, error, children}) => {
	const errorExists = error && error.length,
				titleExists = title && title.length;

	return (
		<div className={errorExists ? invalidFilter : filter}>
		{titleExists ? <div><label className={label}>{title}</label><hr/></div>	: ""}
		<div>
			{children}
		</div>
		{errorExists ? <p className={errorText}>{error}</p> : ""}
	</div>
	);
};

Filter.propTypes = {
	title:    React.PropTypes.string,
	error:    React.PropTypes.string,
	children: React.PropTypes.node.isRequired
};

export default Filter;
