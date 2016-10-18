import React from "react";
import {thumbnailContainer, thumbnail, preview} from "./imagesPreview.css";

const ImagesPreview = ({urls}) => {
	const images = urls.map((url, index) =>
		<div key={index} className={thumbnailContainer}>
			<img src={url} className={thumbnail}/>
		</div>
	);

	return (
		<div className={preview}>
			{images}
		</div>
	);
};

ImagesPreview.propTypes = {
	urls: React.PropTypes.array
};

export default ImagesPreview;

