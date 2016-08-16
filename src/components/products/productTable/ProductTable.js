import React, {Component} from "react";
import CSSModules from "react-css-modules";
import Product from "../product/Product";
import styles from "./productTable.css";

class ProductTable extends Component {
	renderProducts(products) {
		return products.map((product) =>
			<Product key={product.id} product={product}/>
		);
	}

	render() {
		const {products} = this.props;

		return (
			<div styleName="container">
				{this.renderProducts(products)}
			</div>
		)
	}
}

ProductTable.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default CSSModules(ProductTable, styles);