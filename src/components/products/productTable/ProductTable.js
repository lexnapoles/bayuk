import PropTypes from "prop-types";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import Spinner from "../../spinner/Spinner";
import ProductOverview from "../productOverview/ProductOverview";
import { container, spinner } from "./productTable.css";
import LoadMore from "../../loadMore/LoadMore";

class ProductTable extends Component {
  static renderProducts(products) {
    return products.map(product => (
      <ProductOverview
        key={product.id}
        product={product}
        onClick={() => browserHistory.push(`/product/${product.id}`)}
      />
    ));
  }

  static renderSpinner() {
    return (
      <main className={spinner}>
        <Spinner />
      </main>
    );
  }

  constructor(props) {
    super(props);

    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
  }

  onLoadMoreClick(event) {
    event.preventDefault();

    this.props.onLoadMoreClick();
  }

  render() {
    const {
      isFetching,
      products,
      nextPageUrl,
      pageCount,
      children
    } = this.props;

    const isEmpty = !products.length;

    if (isEmpty && isFetching) {
      return ProductTable.renderSpinner();
    }

    const isLastPage = !nextPageUrl;

    if (isEmpty && isLastPage) {
      return (
        <h1>
          <i>Sorry, there&apos;s nothing here!</i>
        </h1>
      );
    }

    return (
      <div>
        <div>
          <div className={container}>
            {ProductTable.renderProducts(products)}
          </div>
          {pageCount > 0 &&
            !isLastPage && (
              <LoadMore
                isFetching={isFetching}
                onLoadMoreClick={this.onLoadMoreClick}
              />
            )}
          {children}
        </div>
      </div>
    );
  }
}

const productPropTypes = PropTypes.shape({
  images: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  price: PropTypes.number
});

ProductTable.propTypes = {
  products: PropTypes.arrayOf(productPropTypes),
  onLoadMoreClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  children: PropTypes.element,
  pageCount: PropTypes.number,
  nextPageUrl: PropTypes.string
};

ProductTable.defaultProps = {
  products: [],
  children: undefined,
  nextPageUrl: undefined,
  pageCount: 0,
  isFetching: true
};

export default ProductTable;
