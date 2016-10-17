import React from "react";
import Filter from "../../filters/filter/Filter";
import {thumbnailContainer, thumbnail, preview} from "./imgInput.css";

const ImgInput = ({urls, onChange}) => {
	const images = urls.map((url, index) =>
		<div key={index} className={thumbnailContainer}>
			<img src={url} className={thumbnail}/>
		</div>
	);

	return (
		<Filter title="Pictures">
			<div className={preview}>
				{images}
			</div>
			<input type="file" accept="image/*" onChange={onChange}/>
		</Filter>)
};

ImgInput.propTypes = {
	urls:     React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired
};

export default ImgInput;

