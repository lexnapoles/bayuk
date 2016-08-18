import React from 'react';
import {container, map} from "./geolocationInfo.css";

const GeolocationInfo = ({className, style}) => {
	return (
		<div className={`${container} ${className}`} style={style}>
			<img className={map}
				src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284"/>
		</div>
	);
};

GeolocationInfo.propTypes = {
	style:            React.PropTypes.object,
	className: React.PropTypes.string
};
GeolocationInfo.defaultProps = {
	style:            {},
	className: ""
};

export default GeolocationInfo;