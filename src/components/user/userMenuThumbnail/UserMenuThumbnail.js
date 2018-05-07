import PropTypes from "prop-types";
import React from "react";
import { browserHistory } from "react-router";
import { container, userImage, text } from "./thumbnail.css";

const UserMenuThumbnail = ({ user }) => {
  const { id, name, image } = user;
  const defaultImageUrl = "image/user/default.jpg";
  const onClick = () => browserHistory.push(`${id ? `/user/${id}` : "/auth"}`);

  return (
    <div
      role="button"
      tabIndex={-1}
      className={container}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <img alt="user" className={userImage} src={image || defaultImageUrl} />
      <p className={text}>{name || "Register or Log In"}</p>
    </div>
  );
};

UserMenuThumbnail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  })
};

UserMenuThumbnail.defaultProps = {
  user: {}
};

export default UserMenuThumbnail;
