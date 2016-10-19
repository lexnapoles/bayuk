import React from "react";
import FileInput from "./FileInput";

const ImageInput = ({className, style, onChange}) =>
	<FileInput className={className} style={style} accept="image/*" onChange={onChange}/>

ImageInput.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	className: React.PropTypes.string,
	style:     React.PropTypes.object
};

ImageInput.defaultProps = {
	style:     {},
	className: ""
};

export default ImageInput;