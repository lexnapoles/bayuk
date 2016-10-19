import React from "react";
import Filter from "../filter/Filter";
import ImageInput2 from "../../inputs/ImageInputV2";
import {imagesContainer} from "./imagesFilter.css";

const MAX_IMAGES = 3;

const ImageFilter = ({urls, onChange}) => {
	const getImages = (urls) => {
		const images = [];

		for (let i = 0; i < MAX_IMAGES; i++) {
			images.push(<ImageInput2  key={i} id={i} url={urls[i]} onChange={onChange}/>)
		}

		return images;
	};

	return (
		<Filter title="Pictures">
			<div className={imagesContainer}>
			{getImages(urls)}
			</div>
		</Filter>
	)
};

ImageFilter.propTypes = {
	urls:     React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired
};

export default ImageFilter;

