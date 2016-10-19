import React from "react";
import Filter from "../filter/Filter";
import ImageInputContainerV2 from "../../inputs/fileInputs/imageInput/ImageInputContainerV2";
import {imagesContainer} from "./imagesFilter.css";

const ImageFilter = ({maxImages, onChange}) => {
	const getImages = () => {
		if (maxImages <= 0) {
			return;
		}

		const images = [];

		for (let i = 0; i < maxImages; i++) {
			images.push(<ImageInputContainerV2 key={i} id={i} onChange={onChange.bind(null, i)}/>)
		}

		return images;
	};

	return (
		<Filter title="Pictures">
			<div className={imagesContainer}>
			{getImages()}
			</div>
		</Filter>
	)
};

ImageFilter.propTypes = {
	maxImages: React.PropTypes.number.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default ImageFilter;

