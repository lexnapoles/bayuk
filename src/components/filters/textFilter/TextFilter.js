import React from "react";
import {container, input, underline} from "./textFilter.css";

const TextFilter = ({name, placeholder, onChange}) =>
	<div className={container}>
		<input id="name"
						className={input}
						type="text"
						value={name}
						placeholder={placeholder}
						onChange={onChange} required/>
		<hr className={underline}/>
	</div>

TextFilter.propTypes = {
	name:        React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	onChange:    React.PropTypes.func.isRequired
};

TextFilter.defaultProps = {
	placeholder: ""
}

export default TextFilter;
