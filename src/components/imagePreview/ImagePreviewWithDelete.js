import React from 'react';
import Icon from "react-fa";
import ImagePreview from "./ImagePreview";
import {container, imageContainer, deleteBtn} from "./imagePreviewWithDelete.css";

const ImagePreviewWithDelete = ({hover, className, url, onDelete}) =>
	<div className={container}>
		<div className={hover ? imageContainer : "" }>
			<ImagePreview className={className} url={url}/>
		</div>
		<Icon className={deleteBtn} name="minus-circle" onClick={onDelete} size="2x"/>
	</div >

ImagePreviewWithDelete.propTypes = {
	hover:     React.PropTypes.bool,
	className: React.PropTypes.string,
	url:       React.PropTypes.string.isRequired,
	onDelete:  React.PropTypes.func.isRequired
};


export default ImagePreviewWithDelete;