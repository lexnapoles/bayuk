import PropTypes from "prop-types";
import React from "react";
import { thumbnailContainer, inputContainer } from "./imageInput.css";
import FileInput from "../FileInput";
import ImagePreview from "../../../imagePreview/ImagePreviewWithDeleteAndHover";

const ImageInput = ({ id, url, onAdd, onDelete }) =>
  url ? (
    <ImagePreview
      className={thumbnailContainer}
      url={url}
      onDelete={onDelete}
    />
  ) : (
    <FileInput
      className={inputContainer}
      id={id}
      accept="image/*"
      onChange={onAdd}
    />
  );

ImageInput.propTypes = {
  id: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  url: PropTypes.string
};

ImageInput.defaultProps = {
  url: undefined
};

export default ImageInput;
