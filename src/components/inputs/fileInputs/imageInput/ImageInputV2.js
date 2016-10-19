import React from "react";
import {inputContainer, thumbnailContainer, thumbnail} from "./imageInputV2.css";
import FileInput from "../FileInput";

const ImageInputV2 = ({id, url, onChange}) => {
	const input = <FileInput className={inputContainer} id={id} accept="image/*" onChange={onChange}/>

	const preview =
					<div className={thumbnailContainer}>
						<img src={url} className={thumbnail}/>
					</div>

	return url ? preview : input;
};

ImageInputV2.propTypes = {
	id:       React.PropTypes.number.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default ImageInputV2;

