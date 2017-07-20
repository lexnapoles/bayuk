import PropTypes from 'prop-types';
import React from 'react';
import {container, userImage, rating} from "./userOverview.css";
import Icon from "react-fa";
import {times} from "lodash/util";
import Spinner from "../../../spinner/Spinner";

const renderRating = (rating = 0) => {
	const MAX_RATING = 5,
				onStars    = times(parseInt(rating), times => <Icon key={`${MAX_RATING}-${times}`} name="star" size="lg"/>),
				offStars   = times(MAX_RATING - parseInt(rating), times => <Icon key={`${MAX_RATING-rating}-${times}`} name="star-o" size="lg"/>);

	return [...onStars, ...offStars];
};

const renderUser = (user, className, style) =>
	<div className={`${container} ${className}`} style={style}>
		<img className={userImage} width="100" height="100" src={user.image} alt="userPic"/>
		<p>{user.name}</p>
		<div className={rating}>
			{renderRating(user.rating)}
		</div>
	</div>;

const UserOverview = ({user, className, style}) =>
	<div>
		{
			user
			? renderUser(user, className, style)
			: <main className={`${container} ${className}`}><Spinner/></main>
		}
	</div>;

UserOverview.propTypes = {
	user:      PropTypes.object,
	style:     PropTypes.object,
	className: PropTypes.string
};

UserOverview.defaultProps = {
	style:     {},
	className: ""
};

export default UserOverview;