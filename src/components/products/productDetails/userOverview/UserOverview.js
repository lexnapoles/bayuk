import React, {PropTypes} from 'react';
import {container, userImage, rating} from "./userOverview.css";
import Icon from "react-fa";
import {times} from "lodash/util";
import Spinner from "../../../spinner/Spinner";

const UserOverview = ({isFetching, user, className, style}) => {
	const renderRating = rating => {
		const MAX_RATING = 5,
					onStars    = times(parseInt(rating), times => <Icon key={`${MAX_RATING}-${times}`} name="star" size="lg"/>),
					offStars   = times(MAX_RATING - parseInt(rating), times => <Icon key={`${MAX_RATING-rating}-${times}`} name="star-o" size="lg"/>);

		return [...onStars, ...offStars];
	};

	const renderUser = user =>
		<div className={`${container} ${className}`} style={style}>
			<img className={userImage} width="100" height="100" src={user.image} alt="userPic"/>
			<p>{user.name}</p>
			<div className={rating}>
				{renderRating(user.rating)}
			</div>
		</div>;

	return (
		<div>
			{!isFetching
				? renderUser(user)
				: <main className={`${container} ${className}`}><Spinner/></main>}
		</div>
	);
};

UserOverview.propTypes = {
	user:       PropTypes.object.isRequired,
	isFetching: PropTypes.bool,
	style:      PropTypes.object,
	className:  PropTypes.string
};

UserOverview.defaultProps = {
	isFetching: false,
	style:     {},
	className: ""
};

export default UserOverview;