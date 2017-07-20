import PropTypes from 'prop-types';
import React from "react";
import {browserHistory} from "react-router";
import {container, userImage, text} from "./thumbnail.css";

const UserMenuThumbnail = ({user}) => {
	const {id, name, image} = user,
				defaultImageUrl   = "image/user/default.jpg",
				onClick           = () => browserHistory.push(`${id ? `/user/${id}` : "/auth"}`);

	return (
		<div className={container} onClick={onClick}>
			<img className={userImage} src={image ? image : defaultImageUrl}/>
			<p className={text}>{name ? name : "Register or Log In"}</p>
		</div>
	);
};

UserMenuThumbnail.propTypes = {
	user: PropTypes.shape({
		id:    PropTypes.string,
		name:  PropTypes.string,
		image: PropTypes.string
	})
};

export default UserMenuThumbnail;