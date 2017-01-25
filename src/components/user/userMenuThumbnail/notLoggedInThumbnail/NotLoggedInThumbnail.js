import React from "react";
import {browserHistory} from "react-router";

const NotLoggedInThumbnail = ({image}) =>
	<div onClick={() => browserHistory.push("/auth")}>
		<img width={20} height={20} src={image}/>
		<p>Register or Log In</p>
	</div>;

NotLoggedInThumbnail.propTypes = {
	image: React.PropTypes.string.isRequired
};

export default NotLoggedInThumbnail;
