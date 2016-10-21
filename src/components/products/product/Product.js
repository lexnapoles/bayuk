import React, {Component} from "react";
import styles from "./product.css";

class Product extends Component {
	render() {
		const {images, name, price} = this.props.product,
					{product}             = styles;

		return (
			<div className={product} onClick={this.props.onClick}>
				<img src={images[0]}/>
				<h2>{price}</h2>
				<h3>{name}</h3>
			</div>
		);
	}
}

Product.propTypes = {
	product: React.PropTypes.object.isRequired,
	onClick: React.PropTypes.func
};

export default Product;   
