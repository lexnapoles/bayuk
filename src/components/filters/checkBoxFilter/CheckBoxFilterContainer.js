import PropTypes from "prop-types";
import React, { Component } from "react";
import CheckBoxFilter from "./CheckBoxFilter";
import { createDefaultObjectFrom } from "../../../utils";

class CheckBoxFilterContainer extends Component {
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    const valueKey = event.target.id;
    const updatedValue = this.getUpdatedValues(valueKey);

    this.props.onChange(updatedValue);
  }

  getUpdatedValues(key) {
    const values = this.props.value;

    let newValues = values;

    if (this.props.exclusive) {
      newValues = createDefaultObjectFrom(values, false);
    }

    newValues[key] = !values[key];

    return newValues;
  }

  render() {
    const { title, error, value } = this.props;

    return (
      <CheckBoxFilter
        title={title}
        onChange={this.onValueChange}
        value={value}
        error={error}
      />
    );
  }
}

CheckBoxFilterContainer.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  exclusive: PropTypes.bool
};

CheckBoxFilterContainer.defaultProps = {
  exclusive: true,
  error: ""
};

export default CheckBoxFilterContainer;
