import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

const LoadMore = ({ isFetching, onLoadMoreClick }) => (
  isFetching
    ? <Spinner />
    : <button style={{ fontSize: '150%' }} onClick={onLoadMoreClick} disabled={isFetching} >
      Load More
    </button >
);

LoadMore.propTypes = {
  isFetching: PropTypes.bool,
  onLoadMoreClick: PropTypes.func.isRequired,
};

LoadMore.defaultProps = {
  isFetching: true,
};

export default LoadMore;
