import React from "react";
import Filter from "../filter/Filter";
import ImagesPreview from "../../imagesPreview/ImagesPreview";
import ImageInput from "../../inputs/fileInputs/ImageInput";

const ImageFilter = ({urls, onChange}) => {
	return (
		<Filter title="Pictures">
			<ImagesPreview urls={urls}/>
			<ImageInput onChange={onChange}/>
		</Filter>)
};

ImageFilter.propTypes = {
	urls:     React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired
};

export default ImageFilter;

