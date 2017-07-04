import React, {PropTypes} from "react";
import Filter from "../filter/Filter";
import ImageInput from "../../inputs/fileInputs/imageInput/ImageInputContainer";
import {imagesContainer} from "./imagesFilter.css";

const ImageFilter = ({urls, error, maxImages, onAdd, onDelete}) => {
	const getImages = (urls) => {
		if (maxImages <= 0) {
			return;
		}

		const images = [];

		for (let i = 0; i < maxImages; i++) {
			images.push(
				<ImageInput
					key={i}
					url={urls[i] ? urls[i] : ""}
					id={i}
					onAdd={onAdd.bind(null, i)}
					onDelete={onDelete.bind(null, i)}/>
			)
		}

		return images;
	};

	return (
		<Filter title="Pictures" error={error}>
			<div className={imagesContainer}>
				{getImages(urls)}
			</div>
		</Filter>
	)
};

ImageFilter.propTypes = {
	urls:      PropTypes.object,
	error:     PropTypes.string,
	maxImages: PropTypes.number.isRequired,
	onAdd:     PropTypes.func.isRequired,
	onDelete:  PropTypes.func.isRequired
};

ImageFilter.defaultProps = {
	urls: []
};

export default ImageFilter;

