import React from "react";

const UserThumbnail = ({image}) =>
	<div>
		<img width={20} height={20} src={image}/>
		<p>{name}</p>
	</div>;

UserThumbnail.propTypes = {
	name:  React.PropTypes.string.isRequired,
	image: React.PropTypes.string.isRequired
};

export default UserThumbnail;
