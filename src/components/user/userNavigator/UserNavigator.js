import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PropTypes from "prop-types";
import ProductsSoldByUser from "../../products/productsByUser/ProductsSoldByUser";
import ProductsOnSellByUser from "../../products/productsByUser/ProductsOnSellByUser";
import Reviews from "../../reviews/Reviews";
import {
  navigatorContainer,
  navigator,
  navigatorItem,
  navigatorCenterItem,
  navigatorItemActive
} from "./userNavigator.css";

const UserNavigator = ({ userId }) => (
  <Tabs
    className={navigatorContainer}
    selectedTabClassName={navigatorItemActive}
  >
    <TabList className={navigator}>
      <Tab className={navigatorItem}>On Sell</Tab>
      <Tab className={navigatorCenterItem}>Sold</Tab>
      <Tab className={navigatorItem}>Reviews</Tab>
    </TabList>

    <div>
      <TabPanel>
        <ProductsOnSellByUser user={userId} />
      </TabPanel>
      <TabPanel>
        <ProductsSoldByUser user={userId} />
      </TabPanel>
      <TabPanel>
        <Reviews user={userId} />
      </TabPanel>
    </div>
  </Tabs>
);

UserNavigator.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserNavigator;
