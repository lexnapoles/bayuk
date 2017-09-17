import React from 'react';
import PropTypes from 'prop-types';
import UserOverview from '../userOverview/UserOverview';
import GeolocationInfo from '../../products/productDetails/geolocationInfo/GeolocationInfo';
import {
  container,
  profile,
  profileSection,
  userTable,
  navigator,
  navigatorItem,
  navigatorCenterItem,
} from './userProfile.css';
import Header from '../../header/Header';

const UserProfile = ({ user, children }) => (
  <div className={container} >
    <Header />
    <main className={profile} >
      <section className={profileSection} >
        <UserOverview user={user} />
      </section >

      <section className={profileSection} >
        <GeolocationInfo latitude={user.latitude} longitude={user.longitude} />
      </section >

      <section className={userTable} >
        <nav className={navigator} >
          <div className={navigatorItem} >On sell</div >
          <div className={navigatorCenterItem} >Sold</div >
          <div className={navigatorItem} >Reviews</div >
        </nav >
        <div >
          {children}
        </div >
      </section >
    </main >
  </div >
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  children: PropTypes.node,
};

UserProfile.defaultProps = {
  user: {},
  children: [],
};

export default UserProfile;
