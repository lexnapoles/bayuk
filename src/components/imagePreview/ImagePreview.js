import React, {PropTypes} from 'react';

const ImagePreview = ({className, url}) => <img className={className} src={url}/>;

ImagePreview.propTypes = {
	className: PropTypes.string,
	url:       PropTypes.string.isRequired
};

export default ImagePreview;