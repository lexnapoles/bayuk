import React from "react";
import {browserHistory} from "react-router";
import {container, userImage, text} from "./thumbnail.css";

const UserMenuThumbnail = ({isLoggedIn, id, name, image}) => {
	const onClick = () => browserHistory.push(`${isLoggedIn ? `/user/${id}` : "/auth"}`);

	return (
		<div className={container} onClick={onClick}>
			<img className={userImage} width={20} height={20} src={image}/>
			<p className={text}>{isLoggedIn ? name : "Register or Log In"}</p>
		</div>
	);
};

UserMenuThumbnail.propTypes = {
	isLoggedIn: React.PropTypes.bool.isRequired,
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	image: React.PropTypes.string
};

export default UserMenuThumbnail;