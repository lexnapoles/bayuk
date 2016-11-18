import React from "react";
import {thumbnailContainer, inputContainer} from "./imageInput.css";
import FileInput from "../FileInput";
import ImagePreview from "../../../imagePreview/ImagePreviewWithDeleteAndHover";

const ImageInputV2 = ({id, url, onAdd, onDelete}) =>
	url
		? <ImagePreview className={thumbnailContainer} url={url} onDelete={onDelete}/>
		: <FileInput className={inputContainer} id={id} accept="image/*" onChange={onAdd}/>;

ImageInputV2.propTypes = {
	id:       React.PropTypes.number.isRequired,
	url:      React.PropTypes.string,
	onAdd:    React.PropTypes.func.isRequired,
	onDelete: React.PropTypes.func.isRequired
};

export default ImageInputV2;

