import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Link} from "react-router";
import CSSModules from "react-css-modules";
import Product from "../product/Product";
import styles from "./productTable.css";
import Icon from "react-fa";

class ProductTable extends Component {
	renderProductsTable(products) {
		return (
			<div>
				<div styleName="container">
					{this.renderProducts(products)}
				</div>
				<div styleName="addButtonContainer">
					<Link styleName="addButton" to={"/add"}>
						<Icon name="plus-circle" size="4x"/>
					</Link>
				</div>
			</div>
		);
	}

	renderProducts(products) {
		return products.map(product =>
			<Product key={product.id} product={product}
								onClick={() => browserHistory.push(`/product/${product.id}`)}/>
		);
	}

	render() {
		const {isFetching, products} = this.props;

		return (isFetching ? <div>Loading products...</div> : this.renderProductsTable(products));
	}
}

ProductTable.propTypes = {
	products:   React.PropTypes.array.isRequired,
	isFetching: React.PropTypes.bool
};

ProductTable.defaultProps = {
	isFetching: false
};

export default CSSModules(ProductTable, styles);