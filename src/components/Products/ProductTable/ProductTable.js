import React, {Component} from "react";
import Product from "../Product/Product";
import styles from "./productTable.css";

class ProductTable extends Component {
	renderProducts(products) {
		return products.map((product) =>
			<Product key={product.id} product={product}/>
		);
	}

	render() {
		const {products} = this.props,
					{container} = styles;

		return (
			<div className={container}>
				{this.renderProducts(products)}
			</div>
		)
	}
}

ProductTable.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default ProductTable;