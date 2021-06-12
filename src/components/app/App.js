import React, { Component } from "react";
import { connect } from "react-redux";
import { container, main } from "../layout.css";
import HomeHeader from "./homeHeader/HomeHeader";
import { loadProductsByDistance } from "../../actions/products";
import loadCategories from "../../actions/categories";
import { loadGeolocation } from "../../actions/location";
import geolocated from "../geolocated/geolocated";
import { getGeolocation } from "../../reducers/root";
import ProductsByFilter from "../products/productsByFilter/ProductsByFilter";
import { DISTANCE_FILTER } from "../../constants/productFilters";
import { productsByDistanceQuery } from "../../apiQueries";

const loadData = props => {
  const { latitude, longitude } = props;

  props.loadGeolocation({ latitude, longitude });
  props.loadCategories();

  const productsQuery = productsByDistanceQuery(latitude, longitude);
  props.loadProductsByDistance(productsQuery);
};

class App extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div className={container}>
        <HomeHeader />
        <main className={main}>
          <ProductsByFilter filter={DISTANCE_FILTER} />
        </main>
        <footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const coords = getGeolocation(state);

  return {
    isAlreadyLocated: Boolean(coords),
    coords
  };
};

export default connect(mapStateToProps, {
  loadProductsByDistance,
  loadCategories,
  loadGeolocation
})(geolocated(App));
