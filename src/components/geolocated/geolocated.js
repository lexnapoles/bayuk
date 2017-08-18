import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { omit } from 'lodash/object';

const DEFAULT_MADRID_COORDS = {
  latitude: 40.416,
  longitude: 3.7,
};

const propTypes = {
  isAlreadyLocated: PropTypes.bool,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};

const defaultProps = {
  isAlreadyLocated: false,
  coords: null,
};

const geolocated = (WrappedComponent) => {
  class Geolocator extends Component {
    constructor(props) {
      super(props);

      this.state = DEFAULT_MADRID_COORDS;

      this.getGeolocation = this.getGeolocation.bind(this);
    }

    componentWillMount() {
      if (this.props.isAlreadyLocated) {
        return;
      }

      this.getGeolocation();
    }

    getGeolocation() {
      const success = ({ coords: { latitude, longitude } }) =>
        this.setState({
          latitude,
          longitude,
        });

      navigator.geolocation.getCurrentPosition(success);
    }

    getAlreadyLocatedCoordsProps({ coords: { latitude, longitude } }) {
      return {
        ...omit(this.props, 'isAlreadyLocated'),
        latitude,
        longitude,
      };
    }

    getOwnCoordsProps() {
      return {
        ...omit(this.props, 'isAlreadyLocated'),
        ...this.state,
      };
    }

    render() {
      const props = this.props.isAlreadyLocated && this.props.coords
        ? this.getAlreadyLocatedCoordsProps(this.props)
        : this.getOwnCoordsProps();

      return <WrappedComponent {...props} />;
    }
  }

  Geolocator.propTypes = propTypes;

  Geolocator.defaultProps = defaultProps;

  return Geolocator;
};

export default geolocated;
