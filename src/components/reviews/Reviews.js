import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "react-fa";
import { times } from "lodash/util";
import { reviewsQuery } from "../../apiQueries";
import { loadReviews } from "../../actions/reviews";
import { getListOfReviewsById, getReviews } from "../../reducers/root";
import { listContainer, item, itemTitle } from "./reviews.css";

const loadData = props => {
  const userId = props.user;

  props.loadReviews(userId, reviewsQuery());
};

const renderOnStars = (rating, maxRating) =>
  times(parseInt(rating, 10), iteration => (
    <Icon key={`${maxRating}-${iteration}`} name="star" size="lg" />
  ));

const renderOffStars = (rating, maxRating) =>
  times(maxRating - parseInt(rating, 10), iteration => (
    <Icon key={`${maxRating - rating}-${iteration}`} name="star-o" size="lg" />
  ));

const renderRating = (rating = 0) => {
  const MAX_RATING = 5;

  return [
    ...renderOnStars(rating, MAX_RATING),
    ...renderOffStars(rating, MAX_RATING)
  ];
};

class Reviews extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const { reviews } = this.props;

    return (
      <div className={listContainer}>
        {reviews.map(
          ({
            description: review,
            rating,
            source: { name: reviewer },
            product: { category: productCategory }
          }) => (
            <div className={item}>
              <div className={itemTitle}>
                <div>{reviewer}</div>
                {renderRating(rating)}
              </div>
              <p>
                {reviewer} bought a product of {productCategory}
              </p>
              <div>{review}</div>
              <hr />
            </div>
          )
        )}
      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      source: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
      product: PropTypes.shape({ category: PropTypes.string.isRequired })
        .isRequired
    })
  )
};

Reviews.defaultProps = {
  reviews: []
};

const mapStateToProps = (state, { user }) => {
  const pagination = getReviews(state, user) || {};

  const filteredReviews = getListOfReviewsById(state, pagination.ids);

  return {
    reviews: filteredReviews,
    ...pagination
  };
};

const mapDispatchToProps = (dispatch, { user }) => ({
  loadReviews: (...data) => dispatch(loadReviews(...data)),
  onLoadMoreClick: () => dispatch(loadReviews(user, {}, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
