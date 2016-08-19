import React from 'react';
import {container, map} from "./geolocationInfo.css";

const GeolocationInfo = ({className, style}) => {
	return (
		<div className={`${container} ${className}`} style={style}>
			<img className={map}
				src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=size:mid|color:red|label:E|37.400465,-122.073003|37.437328,-122.159928&markers=size:small|color:blue|37.369110,-122.096034"/>
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