import React from "react";
import Filter from "../filter/Filter";
import ImageInputContainerV2 from "../../inputs/fileInputs/imageInput/ImageInputContainerV2";
import {imagesContainer} from "./imagesFilter.css";

const ImageFilter = ({urls, maxImages, onAdd, onDelete}) => {
	const getImages = (urls) => {
		if (maxImages <= 0) {
			return;
		}

		const images = [];

		for (let i = 0; i < maxImages; i++) {
			images.push(
				<ImageInputContainerV2
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
		<Filter title="Pictures">
			<div className={imagesContainer}>
				{getImages(urls)}
			</div>
		</Filter>
	)
};

ImageFilter.propTypes = {
	urls:      React.PropTypes.object,
	maxImages: React.PropTypes.number.isRequired,
	onAdd:     React.PropTypes.func.isRequired,
	onDelete:  React.PropTypes.func.isRequired
};

ImageFilter.defaultProps = {
	urls: []
};

export default ImageFilter;

