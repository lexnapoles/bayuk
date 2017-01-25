import React from "react";
import {browserHistory} from "react-router";
import {container, userImage, text} from "../thumbnail.css";

const NotLoggedInThumbnail = ({image}) =>
	<div className={container} onClick={() => browserHistory.push("/auth")}>
		<img className={userImage} width={20} height={20} src={image}/>
		<p className={text}>Register or Log In</p>
	</div>;

NotLoggedInThumbnail.propTypes = {
	image: React.PropTypes.string.isRequired
};

export default NotLoggedInThumbnail;
