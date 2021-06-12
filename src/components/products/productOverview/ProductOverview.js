import PropTypes from "prop-types";
import React from "react";
import { product as productClassName } from "./productOverview.css";

const ProductOverview = ({ onClick, product: { images, name, price } }) => (
  <div
    role="link"
    tabIndex="0"
    className={productClassName}
    onClick={onClick}
    onKeyDown={onClick}
  >
    <img alt="product overview" src={images[0]} />
    <h2>{parseInt(price, 10)}</h2>
    <h3>{name}</h3>
  </div>
);

const productPropTypes = PropTypes.shape({
  images: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  price: PropTypes.number
});

ProductOverview.propTypes = {
  product: productPropTypes.isRequired,
  onClick: PropTypes.func
};

ProductOverview.defaultProps = {
  onClick: () => undefined
};

export default ProductOverview;
