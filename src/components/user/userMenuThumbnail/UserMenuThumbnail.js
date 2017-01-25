import React from "react";
import NotLoggedInThumbnail from "./notLoggedInThumbnail/NotLoggedInThumbnail";
import UserThumbnail from "./userThumbnail/UserThumbnail";

const UserMenuThumbnail = ({isLoggedIn, name, image}) => {
	return (
		<div>
			{isLoggedIn
				? <UserThumbnail name={name} image={image}/>
				: <NotLoggedInThumbnail image={image}/>}
		</div>
	)
};

UserMenuThumbnail.propTypes = {
	isLoggedIn: React.PropTypes.bool.isRequired,
	image:      React.PropTypes.string.isRequired,
	name:       React.PropTypes.string
};

export default UserMenuThumbnail;