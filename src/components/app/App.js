import React, { Component } from 'react';
import { connect } from 'react-redux';
import { container, main } from '../layout.css';
import HomeHeader from './homeHeader/HomeHeader';
import ProductsByDistance from '../products/productsByDistance/ProductsByDistance';
import { loadProductsByDistance } from '../../actions/products';
import loadCategories from '../../actions/categories';
import { loadGeolocation } from '../../actions/location';
import geolocated from '../geolocated/geolocated';
import { getGeolocation } from '../../reducers/root';

const loadData = (props) => {
  const { latitude, longitude } = props;

  const query = {
    sort: 'distance',
    sortOrder: 'descending',
    radius: 99999,
    latitude,
    longitude,
  };

  props.loadGeolocation({ latitude, longitude });
  props.loadCategories();
  props.loadProductsByDistance(query);
};

class App extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div className={container} >
        <HomeHeader />
        <main className={main} >
          <ProductsByDistance />
        </main >
        <footer />
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  const coords = getGeolocation(state);

  return {
    isAlreadyLocated: Boolean(coords),
    coords,
  };
};

export default connect(mapStateToProps, {
  loadProductsByDistance,
  loadCategories,
  loadGeolocation,
})(geolocated(App));
