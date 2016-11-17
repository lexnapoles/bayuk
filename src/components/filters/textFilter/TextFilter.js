import React from "react";
import {container, input, underline} from "./textFilter.css";
import Filter from "../filter/Filter";

const TextFilter = ({name, error, placeholder, onChange}) =>
	<Filter title="" error={error}>
		<div className={container}>
			<input id="name"
							className={input}
							type="text"
							value={name}
							placeholder={placeholder}
							onChange={onChange}/>
			<hr className={underline}/>
		</div>
	</Filter>

TextFilter.propTypes = {
	name:        React.PropTypes.string.isRequired,
	error:       React.PropTypes.string,
	placeholder: React.PropTypes.string,
	onChange:    React.PropTypes.func.isRequired
};

TextFilter.defaultProps = {
	placeholder: ""
};

export default TextFilter;
