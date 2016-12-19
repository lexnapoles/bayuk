import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Link} from "react-router";
import Spinner from "react-spinkit";
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

	renderSpinner() {
		return (
			<main styleName="spinner">
				<Spinner spinnerName="circle"/>
			</main>
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

		return (isFetching ? this.renderSpinner() : this.renderProductsTable(products));
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