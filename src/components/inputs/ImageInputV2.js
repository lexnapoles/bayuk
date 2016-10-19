import React from "react";
import {inputContainer, thumbnailContainer, thumbnail} from "./imageInputV2.css";
import FileInput from "../inputs/fileInputs/FileInput";

const ImageInputV2 = ({url, onChange}) => {
	const input = <FileInput className={inputContainer} accept="image/*" onChange={onChange}/>

	const preview =
					<div className={thumbnailContainer}>
						<img src={url} className={thumbnail}/>
					</div>

	return url ? preview : input;
};

ImageInputV2.propTypes = {
	url:      React.PropTypes.string,
	onChange: React.PropTypes.func.isRequired
};

export default ImageInputV2;

