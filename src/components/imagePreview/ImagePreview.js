import PropTypes from 'prop-types';
import React from 'react';

const ImagePreview = ({ className, url }) => <img alt="preview" className={className} src={url} />;

ImagePreview.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
};

ImagePreview.defaultProps = {
  className: '',
};

export default ImagePreview;
