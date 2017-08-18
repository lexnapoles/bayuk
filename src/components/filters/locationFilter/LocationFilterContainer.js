import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LocationFilter from './LocationFilter';

class LocationFilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: {},
    };

    this.onLocationChange = this.onLocationChange.bind(this);
  }

  onLocationChange({ location: { lat, lng } }) {
    const coords = {
      latitude: lat,
      longitude: lng,
    };

    this.setState({ coords });

    this.props.onChange(coords);
  }

  render() {
    return <LocationFilter onChange={this.onLocationChange} />;
  }
}

LocationFilterContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default LocationFilterContainer;
