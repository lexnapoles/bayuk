import React from "react";
import PropTypes from "prop-types";
import UserOverview from "../userOverview/UserOverview";
import GeolocationInfo from "../../products/productDetails/geolocationInfo/GeolocationInfo";
import {
  container,
  profile,
  profileSection,
  userTable
} from "./userProfile.css";
import Header from "../../header/Header";
import ReturnIcon from "../../icons/returnIcon/ReturnIcon";
import UserNavigator from "../userNavigator/UserNavigator";

const UserProfile = ({ user }) => (
  <div className={container}>
    <Header>
      <ReturnIcon url="/" />
    </Header>
    <main className={profile}>
      <section className={profileSection}>
        <UserOverview user={user} />
      </section>

      <section className={profileSection}>
        <GeolocationInfo latitude={user.latitude} longitude={user.longitude} />
      </section>

      <section className={userTable}>
        <UserNavigator userId={user.id} />
      </section>
    </main>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  })
};

UserProfile.defaultProps = {
  user: {}
};

export default UserProfile;
