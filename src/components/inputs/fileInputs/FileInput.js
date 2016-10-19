import React from "react";
import Icon from "react-fa";
import {inputFile} from "./fileInput.css";

const FileInput = ({className, style, id, accept, onChange, children}) => {
  const inputId = `file${id}`;

	return (
		<div className={className} style={style}>
			<input type="file" name={inputId} id={inputId} accept={accept} className={inputFile} onChange={onChange}/>
			<label htmlFor={inputId}>
				{children || <Icon name="plus-circle" size="2x"/>}
			</label>
		</div>);
}

FileInput.propTypes = {
	className: React.PropTypes.string,
	style:     React.PropTypes.object,
	id:        React.PropTypes.number.isRequired,
	accept:    React.PropTypes.string.isRequired,
	onChange:  React.PropTypes.func.isRequired,
	children:  React.PropTypes.node
};

FileInput.defaultProps = {
	style:     {},
	className: ""
};

export default FileInput;
