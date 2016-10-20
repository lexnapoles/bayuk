import React from "react";
import {inputContainer, thumbnailContainer, thumbnail} from "./imageInputV2.css";
import FileInput from "../FileInput";
import Icon from "react-fa";

const ImageInputV2 = ({id, url, onAdd, onDelete}) => {
	const input = <FileInput className={inputContainer} id={id} accept="image/*" onChange={onAdd}/>

	const preview =
					<div className={thumbnailContainer}>
						<Icon name="minus-circle" onClick={onDelete}/>
						<img src={url} className={thumbnail}/>
					</div>

	return url ? preview : input;
};

ImageInputV2.propTypes = {
	id:       React.PropTypes.number.isRequired,
	url:      React.PropTypes.string.isRequired,
	onAdd: React.PropTypes.func.isRequired,
	onDelete: React.PropTypes.func.isRequired
};

export default ImageInputV2;

