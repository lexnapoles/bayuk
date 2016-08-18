import React from 'react';
import {container, userImage, rating} from "./userInfo.css";
import Icon from "react-fa";

const UserInfo = () => {
	return (
		<div className={container}>
			<img className={userImage} width="100" height="100"
				src="http://www.publicdomainpictures.net/pictures/20000/velka/women-face.jpg" alt="userPic"/>
			<p>John McStar</p>
			<div className={rating}>
				<Icon name="star" size="lg"/>
				<Icon name="star" size="lg"/>
				<Icon name="star" size="lg"/>
				<Icon name="star-half-empty" size="lg"/>
				<Icon name="star-o" size="lg"/>
			</div>
		</div>
	);
};

UserInfo.propTypes = {};
UserInfo.defaultProps = {};

export default UserInfo;