import PropTypes from 'prop-types';
import React, { Component } from "react";
import {browserHistory} from "react-router";
import Spinner from "../../spinner/Spinner";
import ProductOverview from "../productOverview/ProductOverview";
import {container, spinner} from "./productTable.css";

class ProductTable extends Component {
	renderProducts(products) {
		return products.map(product =>
			<ProductOverview key={product.id} product={product}	onClick={() => browserHistory.push(`/product/${product.id}`)}/>
		);
	}

	renderProductsTable(products) {
		return (
			<div>
				<div className={container}>
					{this.renderProducts(products)}
				</div>
				{this.props.children}
			</div>
		);
	}

	renderSpinner() {
		return (
			<main className={spinner}>
				<Spinner/>
			</main>
		);
	}

	render() {
		const {isFetching, products} = this.props;

		return (isFetching ? this.renderSpinner() : this.renderProductsTable(products));
	}
}

ProductTable.propTypes = {
	products:   PropTypes.array.isRequired,
	children:   PropTypes.element,
	isFetching: PropTypes.bool
};

ProductTable.defaultProps = {
	isFetching: false
};

export default ProductTable;