import PropTypes from "prop-types";
import React from "react";
import Icon from "react-fa";
import { inputFile } from "./fileInput.css";

const FileInput = ({ className, style, id, accept, onChange, children }) => {
  const inputId = `file${id}`;

  return (
    <div className={className} style={style}>
      <input
        type="file"
        name={inputId}
        id={inputId}
        accept={accept}
        className={inputFile}
        onChange={onChange}
      />
      <label htmlFor={inputId}>
        {children || <Icon name="plus-circle" size="2x" />}
      </label>
    </div>
  );
};

FileInput.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.number.isRequired,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node
};

FileInput.defaultProps = {
  style: {},
  className: "",
  children: ""
};

export default FileInput;
