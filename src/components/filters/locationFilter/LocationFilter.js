import PropTypes from "prop-types";
import React from "react";
import Geosuggest from "react-geosuggest";
import "react-geosuggest/module/geosuggest.css";
import Filter from "../filter/Filter";

const LocationFilter = ({ onChange, error }) => (
  <Filter title="Location" error={error}>
    <Geosuggest
      placeholder="Where do you want to find?"
      onSuggestSelect={onChange}
    />
  </Filter>
);

LocationFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

LocationFilter.defaultProps = {
  error: ""
};

export default LocationFilter;
