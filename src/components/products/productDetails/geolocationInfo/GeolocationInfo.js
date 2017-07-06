import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {container, map} from "./geolocationInfo.css";

class GeolocationInfo extends Component {
	render() {
		const {className, style, latitude, longitude} = this.props;

		const mapUrl = `https://maps.googleapis.com/maps/api/staticmap
		?center="${latitude.toFixed(4)},${longitude.toFixed(4)}"
		&zoom=14
		&size=500x200
		&maptype=roadmap
		&key=AIzaSyCyX0Ciq1pkgNMAYA6GSDn2x0luKtACTqI`;

		return (
			<div className={`${container} ${className}`} style={style}>
				<img src={mapUrl} className={map}/>
			</div>
		)
	}
}

GeolocationInfo.propTypes = {
	latitude:  PropTypes.number.isRequired,
	longitude: PropTypes.number.isRequired,
	style:     PropTypes.object,
	className: PropTypes.string
};

GeolocationInfo.defaultProps = {
	style:     {},
	className: ""
};

export default GeolocationInfo;
