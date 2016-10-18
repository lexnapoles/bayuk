import React from "react";

const FileInput = ({accept, onChange}) =>
	<input type="file" accept={accept} onChange={onChange}/>


FileInput.propTypes = {
	accept: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default FileInput;
