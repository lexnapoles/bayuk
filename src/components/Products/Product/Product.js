import React, {Component} from "react";

class Product extends Component {
	render() {
		const {photo, name, category, price} = this.props.product;
		
		return (
			<div>
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
