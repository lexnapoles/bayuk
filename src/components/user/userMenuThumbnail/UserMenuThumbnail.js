import React, {PropTypes} from "react";
import {browserHistory} from "react-router";
import {container, userImage, text} from "./thumbnail.css";

const UserMenuThumbnail = ({isLoggedIn, id, name, image}) => {
	const onClick = () => browserHistory.push(`${isLoggedIn ? `/user/${id}` : "/auth"}`);

	return (
		<div className={container} onClick={onClick}>
			<img className={userImage} src={image}/>
			<p className={text}>{isLoggedIn ? name : "Register or Log In"}</p>
		</div>
	);
};

UserMenuThumbnail.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	id:         PropTypes.string,
	name:       PropTypes.string,
	image:      PropTypes.string
};

export default UserMenuThumbnail;