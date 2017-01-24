import React from 'react';
import {container, userImage, rating} from "./userOverview.css";
import Icon from "react-fa";
import {times} from "lodash/util";

const UserOverview = ({user, className, style}) => {
	const renderRating = rating => {
		const MAX_RATING = 5,
					onStars    = times(parseInt(rating), times => <Icon key={`${MAX_RATING}-${times}`} name="star" size="lg"/>),
					offStars   = times(MAX_RATING - parseInt(rating), times => <Icon key={`${MAX_RATING-rating}-${times}`} name="star-o" size="lg"/>);

		return [...onStars, ...offStars];
	};

	const {name, image, rating} = user;

	return (
		<div className={`${container} ${className}`} style={style}>
			<img className={userImage} width="100" height="100" src={image} alt="userPic"/>
			<p>{name}</p>
			<div className={rating}>
				{renderRating(rating)}
			</div>
		</div>
	);
};

UserOverview.propTypes = {
	user:      React.PropTypes.object.isRequired,
	style:     React.PropTypes.object,
	className: React.PropTypes.string
};

UserOverview.defaultProps = {
	style:     {},
	className: ""
};

export default UserOverview;