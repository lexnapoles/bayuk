import React from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import { alignCenter } from "../layout.css";
import { button } from "./loadMore.css";

const LoadMore = ({ isFetching, onLoadMoreClick }) => (
  <div className={alignCenter}>
    {isFetching ? (
      <Spinner />
    ) : (
      <button
        className={button}
        onClick={onLoadMoreClick}
        disabled={isFetching}
      >
        Load More
      </button>
    )}
  </div>
);

LoadMore.propTypes = {
  isFetching: PropTypes.bool,
  onLoadMoreClick: PropTypes.func.isRequired
};

LoadMore.defaultProps = {
  isFetching: true
};

export default LoadMore;
