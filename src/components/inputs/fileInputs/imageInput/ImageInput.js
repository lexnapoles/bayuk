import PropTypes from 'prop-types';
import React from "react";
import {thumbnailContainer, inputContainer} from "./imageInput.css";
import FileInput from "../FileInput";
import ImagePreview from "../../../imagePreview/ImagePreviewWithDeleteAndHover";

const ImageInputV2 = ({id, url, onAdd, onDelete}) =>
	url
		? <ImagePreview className={thumbnailContainer} url={url} onDelete={onDelete}/>
		: <FileInput className={inputContainer} id={id} accept="image/*" onChange={onAdd}/>;

ImageInputV2.propTypes = {
	id:       PropTypes.number.isRequired,
	url:      PropTypes.string,
	onAdd:    PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default ImageInputV2;

