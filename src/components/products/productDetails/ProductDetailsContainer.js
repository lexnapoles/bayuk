import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { omit } from 'lodash/object';
import { connect } from 'react-redux';
import ProductDetails from './ProductDetails';
import { getProductById } from '../../../reducers/root';
import { loadProduct } from '../../../actions/products';

const loadData = ({ loadProduct: load, id }) => load(id);

class ProductDetailsContainer extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const props = omit(this.props, ['loadProduct', 'id']);

    return <ProductDetails {...props} />;
  }
}

ProductDetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  loadProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { params: { id } }) => {
  const item = getProductById(state, id);

  return {
    id,
    product: item,
  };
};

export default connect(mapStateToProps, {
  loadProduct,
})(ProductDetailsContainer);
