import PropTypes from "prop-types";
import React from "react";
import Icon from "react-fa";
import ImagePreview from "./ImagePreview";
import {
  container,
  imageContainer,
  deleteBtn
} from "./imagePreviewWithDelete.css";

const ImagePreviewWithDelete = ({ hover, className, url, onDelete }) => (
  <div className={container}>
    <div className={hover ? imageContainer : ""}>
      <ImagePreview className={className} url={url} />
    </div>
    <Icon
      className={deleteBtn}
      name="minus-circle"
      onClick={onDelete}
      size="2x"
    />
  </div>
);

ImagePreviewWithDelete.propTypes = {
  hover: PropTypes.bool,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

ImagePreviewWithDelete.defaultProps = {
  hover: false,
  className: ""
};

export default ImagePreviewWithDelete;
