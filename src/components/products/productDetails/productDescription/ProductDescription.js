import React from 'react';
import {container, subtitle} from "./productDescription.css";

const ProductDescription = ({className, style, price, name, description}) => {
	return (
		<div className={`${container} ${className}`} style={style}>
			<h1>{`${price}$`}</h1>
			<h3 className={subtitle}>{name}</h3>
			<p>
				{description}
			</p>
		</div>
	);
};

ProductDescription.propTypes = {
	style:       React.PropTypes.object,
	className:   React.PropTypes.string,
	price:       React.PropTypes.number.isRequired,
	name:        React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired
};

ProductDescription.defaultProps = {
	style:     {},
	className: ""
};

export default ProductDescription;