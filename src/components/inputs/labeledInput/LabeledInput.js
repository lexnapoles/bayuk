import PropTypes from "prop-types";
import React from "react";
import { container, title } from "./LabeledInput.css";

const LabeledInput = ({ value, id, description, onChange, inputConf }) => (
  <div className={container}>
    <label className={title} htmlFor={id}>
      {description}
    </label>
    <input id={id} {...inputConf} onChange={onChange} value={value} />
  </div>
);

LabeledInput.propTypes = {
  value: PropTypes.number,
  inputConf: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

LabeledInput.defaultProps = {
  value: undefined,
  inputConf: {}
};

export default LabeledInput;
