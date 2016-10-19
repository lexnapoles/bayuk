import React from "react";
import Filter from "../filter/Filter";
import ImageInputContainerV2 from "../../inputs/fileInputs/imageInput/ImageInputContainerV2";
import {imagesContainer} from "./imagesFilter.css";

const MAX_IMAGES = 3;

const ImageFilter = ({onChange}) => {
	const getImages = () => {
		const images = [];

		for (let i = 0; i < MAX_IMAGES; i++) {
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
	onChange: React.PropTypes.func.isRequired
};

export default ImageFilter;

