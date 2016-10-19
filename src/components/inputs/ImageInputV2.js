import React from "react";
import {inputContainer, thumbnailContainer, thumbnail, inputFile, label} from "./imageInputV2.css";
import Icon from "react-fa";

const ImageInputV2 = ({url, onChange}) => {
	const input =
					<div className={inputContainer}>
						<input type="file" name="file" id="file" className={inputFile} onChange={onChange}/>
						<label htmlFor="file" className={label}>
							<Icon name="plus-circle" size="2x"/>
						</label>
					</div>;

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

