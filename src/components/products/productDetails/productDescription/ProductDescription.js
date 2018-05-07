import PropTypes from "prop-types";
import React from "react";
import { container, subtitle } from "./productDescription.css";

const ProductDescription = ({ className, style, price, name, description }) => (
  <div className={`${container} ${className}`} style={style}>
    <h1>{`${price}$`}</h1>
    <h3 className={subtitle}>{name}</h3>
    <p>{description}</p>
  </div>
);

ProductDescription.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

ProductDescription.defaultProps = {
  style: {},
  className: ""
};

export default ProductDescription;
