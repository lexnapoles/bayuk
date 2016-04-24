import React, {Component} from "react";
import styles from "./product.css";

class Product extends Component {
	render() {
		const {photo, name, category, price} = this.props.product,
					{product} = styles;

		return (
			<div className={product}>
				<img src={photo}/>
				<p>{name}</p>
				<p>{category}</p>
				<p>{price}</p>
			</div>
		);
	}
}

Product.propTypes = {
	product: React.PropTypes.object.isRequired
};

export default Product;   
