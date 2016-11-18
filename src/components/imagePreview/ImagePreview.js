import React from 'react';

const ImagePreview = ({className, url}) => <img className={className} src={url}/>

ImagePreview.propTypes = {
	className: React.PropTypes.string,
	url:       React.PropTypes.string.isRequired
};

export default ImagePreview;