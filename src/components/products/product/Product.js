import React, {Component} from "react";
import styles from "./product.css";

class Product extends Component {
	render() {
		const {photo, name, price} = this.props.product,
					{product} = styles;

		return (
			<div className={product}>
				<img src={photo}/>
				<h2>{price}</h2>
				<h3>{name}</h3>
			</div>
		);
	}
}

Product.propTypes = {
	product: React.PropTypes.object.isRequired
};

export default Product;   
