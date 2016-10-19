import React from "react";
import Filter from "../filter/Filter";
//import ImagesPreview from "../../imagesPreview/ImagesPreview";
//import ImageInput from "../../inputs/fileInputs/ImageInput";
import ImageInput2 from "../../inputs/ImageInputV2";

const ImageFilter = ({urls, onChange}) => {
	return (
		<Filter title="Pictures">
			<ImageInput2 url={urls[0]} onChange={onChange}/>
			{/*<ImagesPreview urls={urls}/>*/}
			{/*<ImageInput onChange={onChange}/>*/}
		</Filter>)
};

ImageFilter.propTypes = {
	urls:     React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired
};

export default ImageFilter;

