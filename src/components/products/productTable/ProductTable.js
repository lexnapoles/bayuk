import React, {Component} from "react";
import {browserHistory} from "react-router";
import CSSModules from "react-css-modules";
import Product from "../product/Product";
import styles from "./productTable.css";
import Icon from "react-fa";

class ProductTable extends Component {
	renderProducts(products) {
		return products.map((product) =>
			<Product key={product.id} product={product}
								onClick={() => browserHistory.push(`/product/${product.id}`)}/>
		);
	}

	render() {
		const {products} = this.props;

		return (
			<div>
				<div styleName="container">
					{this.renderProducts(products)}
				</div>
				<div styleName="addButtonContainer">
					<Icon styleName="addButton" name="plus-circle" size="4x"/>
				</div>
			</div>
		)
	}
}

ProductTable.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default CSSModules(ProductTable, styles);