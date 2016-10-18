import React from "react";
import FileInput from "./FileInput";

const ImageInput = ({onChange}) =>
	<FileInput accept="image/*" onChange={onChange}/>

ImageInput.propTypes = {
	accept: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default ImageInput;