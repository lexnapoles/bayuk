import PropTypes from "prop-types";
import React from "react";
import Filter from "../filter/Filter";
import Spinner from "../../spinner/Spinner";
import CheckBoxInput from "../../inputs/CheckBoxInput";

const renderValues = (values, onChange) => {
  const names = Object.keys(values);

  return names.map(name => (
    <CheckBoxInput
      key={name}
      id={name}
      description={name}
      checked={values[name]}
      onChange={onChange}
    />
  ));
};

const CheckBoxFilter = ({ title, onChange, value, error }) => (
  <Filter title={title} error={error}>
    {Object.keys(value).length ? renderValues(value, onChange) : <Spinner />}
  </Filter>
);

CheckBoxFilter.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.objectOf(PropTypes.bool).isRequired,
  error: PropTypes.string
};

CheckBoxFilter.defaultProps = {
  error: ""
};

export default CheckBoxFilter;
