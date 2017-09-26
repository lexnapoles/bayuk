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
  navigatorContainer,
  navigator,
  navigatorItem,
  navigatorCenterItem,
  navigatorItemActive,
} from './userProfile.css';
import Header from '../../header/Header';
import ProductsSoldByUser from '../../products/productsByUser/ProductsSoldByUser';
import ProductsOnSellByUser from '../../products/productsByUser/ProductsOnSellByUser';

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
        <Tabs
          className={navigatorContainer}
          selectedTabClassName={navigatorItemActive}
        >
          <TabList className={navigator} >
            <Tab className={navigatorItem} >On Sell</Tab >
            <Tab className={navigatorCenterItem} >Sold</Tab >
            <Tab className={navigatorItem} >Reviews</Tab >
          </TabList >

          <div >
            <TabPanel >
              <ProductsOnSellByUser user={user.id} />
            </TabPanel >
            <TabPanel >
              <ProductsSoldByUser user={user.id} />
            </TabPanel >
            <TabPanel >
              <h2 >Reviews coming soon!</h2 >
            </TabPanel >
          </div >
        </Tabs >
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
