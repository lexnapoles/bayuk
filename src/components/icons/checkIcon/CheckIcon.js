import PropTypes from "prop-types";
import React from "react";
import Icon from "react-fa";
import { checkButton } from "./checkIcon.css";

const CheckIcon = ({ formId }) => (
  <button className={checkButton} form={formId}>
    <Icon name="check" size="lg" />
  </button>
);

CheckIcon.propTypes = {
  formId: PropTypes.string.isRequired
};
CheckIcon.defaultProps = {};

export default CheckIcon;
