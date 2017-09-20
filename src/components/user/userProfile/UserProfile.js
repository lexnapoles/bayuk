import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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

const UserProfile = ({ user }) => (
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
        <Tabs >
          <TabList className={navigator} >
            <Tab className={navigatorItem} >On Sell</Tab >
            <Tab className={navigatorCenterItem} >Sold</Tab >
            <Tab className={navigatorItem} >Reviews</Tab >
          </TabList >

          <TabPanel >
            <h2 >Any content 1</h2 >
          </TabPanel >
          <TabPanel >
            <h2 >Any content 2</h2 >
          </TabPanel >
          <TabPanel >
            <h2 >Any content 3</h2 >
          </TabPanel >
        </Tabs >
        );
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
};

UserProfile.defaultProps = {
  user: {},
  children: [],
};

export default UserProfile;
