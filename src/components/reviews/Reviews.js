import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reviewsQuery } from '../../apiQueries';
import { loadReviews } from '../../actions/reviews';
import { getListOfReviewsById, getReviews } from '../../reducers/root';

const loadData = (props) => {
  const userId = props.user;
  const query = reviewsQuery();

  props.loadReviews(userId, query);
};

class ProductsOnSellByUser extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = (state, { user }) => {
  const pagination = getReviews(state, user) || {};

  const filteredReviews = getListOfReviewsById(state, pagination.ids);

  return {
    reviews: filteredReviews,
    ...pagination,
  };
};

const mapDispatchToProps = (dispatch, { user }) => ({
  loadReviews: (...data) => dispatch(loadReviews(...data)),
  onLoadMoreClick: () => dispatch(loadReviews(user, {}, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsOnSellByUser);
