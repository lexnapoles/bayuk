import React from 'react';
import PropTypes from 'prop-types';
import UserOverview from '../userOverview/UserOverview';
import GeolocationInfo from '../../products/productDetails/geolocationInfo/GeolocationInfo';

const UserProfile = ({ user }) => (
  <main >
    <section >
      <UserOverview user={user} />
    </section >

    <section >
      <GeolocationInfo latitude={user.latitude} longitude={user.longitude} />
    </section >

    <nav >
      On sell
      Sold
      Reviews
    </nav >

    <section >
      Table of products or reviews
    </section >
  </main >

);

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};

UserProfile.defaultProps = {
  user: {},
};

export default UserProfile;
