import PropTypes from "prop-types";
import React from "react";
import Icon from "react-fa";
import { times } from "lodash/util";
import {
  container,
  userImage,
  rating as ratingClassName
} from "./userOverview.css";
import Spinner from "../../spinner/Spinner";

const renderOnStars = (rating, maxRating) =>
  times(parseInt(rating, 10), iteration => (
    <Icon key={`${maxRating}-${iteration}`} name="star" size="lg" />
  ));

const renderOffStars = (rating, maxRating) =>
  times(maxRating - parseInt(rating, 10), iteration => (
    <Icon key={`${maxRating - rating}-${iteration}`} name="star-o" size="lg" />
  ));

const renderRating = (rating = 0) => {
  const MAX_RATING = 5;

  return [
    ...renderOnStars(rating, MAX_RATING),
    ...renderOffStars(rating, MAX_RATING)
  ];
};

const renderUser = (user, className, style) => (
  <div className={`${container} ${className}`} style={style}>
    <img
      className={userImage}
      width="100"
      height="100"
      src={user.image}
      alt="userPic"
    />
    <p>{user.name}</p>
    <div className={ratingClassName}>{renderRating(user.rating)}</div>
  </div>
);

const UserOverview = ({ user, className, style }) => (
  <div>
    {user ? (
      renderUser(user, className, style)
    ) : (
      <main className={`${container} ${className}`}>
        <Spinner />
      </main>
    )}
  </div>
);

UserOverview.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }),
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string
};

UserOverview.defaultProps = {
  user: undefined,
  style: {},
  className: ""
};

export default UserOverview;
