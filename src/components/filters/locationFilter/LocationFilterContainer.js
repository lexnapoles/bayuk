import PropTypes from "prop-types";
import React, { Component } from "react";
import LocationFilter from "./LocationFilter";

class LocationFilterContainer extends Component {
  constructor(props) {
    super(props);

    this.onLocationChange = this.onLocationChange.bind(this);
  }

  onLocationChange({ location: { lat, lng } }) {
    const coords = {
      latitude: lat,
      longitude: lng
    };

    this.props.onChange(coords);
  }

  render() {
    return (
      <LocationFilter
        onChange={this.onLocationChange}
        error={this.props.error}
      />
    );
  }
}

LocationFilterContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

LocationFilterContainer.defaultProps = {
  error: ""
};

export default LocationFilterContainer;
