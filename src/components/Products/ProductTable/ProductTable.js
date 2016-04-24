import React, {Component} from "react";
import Product from "../Product/Product";

class ProductTable extends Component {
	renderProducts(products) {
		return products.map((product) =>
			<Product key={product.id} product={product}/>
		);
	}

	render() {
		const {products} = this.props;

		return (
			<div>
				{this.renderProducts(products)}
			</div>
		)
	}
}

ProductTable.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default ProductTable;