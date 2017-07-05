import PropTypes from 'prop-types';
import React, { Component } from "react";

const DEFAULT_MADRID_COORDS = {
	latitude:  40.416,
	longitude: 3.7
};

const geolocated = WrappedComponent => {
	class Geolocator extends Component {
		constructor(props) {
			super(props);

			this.state = DEFAULT_MADRID_COORDS;

			this.getGeolocation = this.getGeolocation.bind(this);
		}

		componentWillMount() {
			this.getGeolocation()
		}

		getGeolocation() {
			const success = ({coords: {latitude, longitude}}) => this.setState({latitude, longitude});

			navigator.geolocation.getCurrentPosition(success);
		}

		render() {
			const props = this.props.alreadyLocated && this.props.coords
				? this.props
				: {...this.props, ...this.state};

			return <WrappedComponent {...props}/>;
		}
	}

	Geolocator.propTypes = {
		alreadyLocated: PropTypes.bool,
		coords:         PropTypes.object
	};

	return Geolocator;
};

export default geolocated;