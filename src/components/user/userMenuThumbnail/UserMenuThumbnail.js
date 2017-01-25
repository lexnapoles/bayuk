import React from "react";

const UserMenuThumbnail = ({isLoggedIn, name, image}) => {
	const renderUser = (name, image) => {
		return (
			<div>
				<img src={image}/>
				<p>{name}</p>
			</div>
		)
	};

	const renderNotLoggedInThumbnail = () => {
		return (
			<div>
				<img src={image}/>
				<p>Register or Log In</p>
			</div>
		)
	};

	return (
		<div>
			{isLoggedIn
				? renderUser(name, image)
				: renderNotLoggedInThumbnail()}
		</div>
	)
};

UserMenuThumbnail.propTypes = {
	isLoggedIn: React.PropTypes.bool.isRequired,
	name:       React.PropTypes.string,
	image:      React.PropTypes.string
};

UserMenuThumbnail.defaultProps = {
};

export default UserMenuThumbnail;