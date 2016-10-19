import React from "react";
import Icon from "react-fa";
import {inputFile} from "./fileInput.css";

const FileInput = ({className, style, accept, onChange, children}) =>
	<div className={className} style={style}>
		<input type="file" name="file" id="file" accept={accept} className={inputFile} onChange={onChange}/>
		<label htmlFor="file">
			{children || <Icon name="plus-circle" size="2x"/>}
		</label>
	</div>;


FileInput.propTypes = {
	accept:   React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	style:     React.PropTypes.object,
	className: React.PropTypes.string,
	children: React.PropTypes.node
};

FileInput.defaultProps = {
	style:     {},
	className: ""
};

export default FileInput;
