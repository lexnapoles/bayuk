import React, {PropTypes} from 'react';
import {container, map} from "./geolocationInfo.css";

const GeolocationInfo = ({className, style}) => {
	return (
		<div className={`${container} ${className}`} style={style}>
				<img className={map} src="http://placehold.it/1000x1000"/>
		</div>
	);
};

GeolocationInfo.propTypes = {
	style:     PropTypes.object,
	className: PropTypes.string
};
GeolocationInfo.defaultProps = {
	style:     {},
	className: ""
};

export default GeolocationInfo;