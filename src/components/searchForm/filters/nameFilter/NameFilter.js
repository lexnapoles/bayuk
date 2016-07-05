import React from "react";
import {container, input} from "./nameFilter.css";

const NameFilter = ({name, onChange}) =>
	<div className={container}>
	<input 	id="name"
					className={input}
					type="text"
					value={name}
					placeholder="What are you looking for?"
					onChange={onChange} required/>
		<hr className="underline"/>
	</div>

NameFilter.propTypes = {
	name:     React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default NameFilter;
