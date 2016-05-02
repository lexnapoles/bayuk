import React, {Component} from "react";
import Product from "../product/Product";
import styles from "./productTable.css";
import CSSModules from "react-css-modules";

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