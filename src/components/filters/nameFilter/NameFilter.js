import React from "react";
import {container, input, underline} from "./nameFilter.css";

const NameFilter = ({name, placeholder, onChange}) =>
	<div className={container}>
		<input id="name"
						className={input}
						type="text"
						value={name}
						placeholder={placeholder}
						onChange={onChange} required/>
		<hr className={underline}/>
	</div>

NameFilter.propTypes = {
	name:        React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	onChange:    React.PropTypes.func.isRequired
};

NameFilter.defaultProps = {
	placeholder: ""
}

export default NameFilter;
