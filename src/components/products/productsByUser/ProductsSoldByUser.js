import React, { Component } from "react";
import { connect } from "react-redux";
import ProductTable from "../productTable/ProductTable";
import {
  getListOfProductsById,
  getProductsSoldByUser
} from "../../../reducers/root";
import { loadProductsSoldByUser } from "../../../actions/products";
import { productsSoldByUserQuery } from "../../../apiQueries";

const loadData = props => {
  const userId = props.user;
  const query = productsSoldByUserQuery(userId);

  props.loadProductsSoldByUser(userId, query, undefined);
};

class ProductsSoldByUser extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return <ProductTable {...this.props} />;
  }
}

const mapStateToProps = (state, { user }) => {
  const pagination = getProductsSoldByUser(state, user) || {};

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination
  };
};

const mapDispatchToProps = (dispatch, { user }) => ({
  loadProductsSoldByUser: (...data) =>
    dispatch(loadProductsSoldByUser(...data)),
  onLoadMoreClick: () => dispatch(loadProductsSoldByUser(user, {}, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSoldByUser);
