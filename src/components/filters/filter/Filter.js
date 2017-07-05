import PropTypes from 'prop-types';
import React from "react";
import {filter, invalidFilter, errorText, label} from "./filter.css";

const Filter = ({title, error, children}) => {
	return (
		<div className={error.length ? invalidFilter : filter}>
		{title.length ? <div><label className={label}>{title}</label><hr/></div>	: ""}
		<div>
			{children}
		</div>
		{error.length ? <p className={errorText}>{error}</p> : ""}
	</div>
	);
};

Filter.propTypes = {
	title:    PropTypes.string,
	error:    PropTypes.string,
	children: PropTypes.node.isRequired
};

Filter.defaultProps = {
	title: "",
	error: ""
};

export default Filter;
