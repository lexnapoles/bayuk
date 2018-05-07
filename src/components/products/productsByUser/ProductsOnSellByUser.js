import React, { Component } from "react";
import { connect } from "react-redux";
import ProductTable from "../productTable/ProductTable";
import {
  getListOfProductsById,
  getProductsOnSellByUser
} from "../../../reducers/root";
import { loadProductsOnSellByUser } from "../../../actions/products";
import { productsOnSellByUserQuery } from "../../../apiQueries";

const loadData = props => {
  const userId = props.user;
  const query = productsOnSellByUserQuery(userId);

  props.loadProductsOnSellByUser(userId, query, undefined);
};

class ProductsOnSellByUser extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return <ProductTable {...this.props} />;
  }
}

const mapStateToProps = (state, { user }) => {
  const pagination = getProductsOnSellByUser(state, user) || {};

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination
  };
};

const mapDispatchToProps = (dispatch, { user }) => ({
  loadProductsOnSellByUser: (...data) =>
    dispatch(loadProductsOnSellByUser(...data)),
  onLoadMoreClick: () => dispatch(loadProductsOnSellByUser(user, {}, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductsOnSellByUser
);
