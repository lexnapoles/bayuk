import PropTypes from 'prop-types';
import React, { Component } from "react";
import {browserHistory} from "react-router";
import {Link} from "react-router";
import Spinner from "../../spinner/Spinner";
import ProductOverview from "../productOverview/ProductOverview";
import Icon from "react-fa";
import {container, addButtonContainer, addButton, spinner} from "./productTable.css";

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
				<div className={addButtonContainer}>
					<Link className={addButton} to={"/add"}>
						<Icon name="plus-circle" size="4x"/>
					</Link>
				</div>
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
	isFetching: PropTypes.bool
};

ProductTable.defaultProps = {
	isFetching: false
};

export default ProductTable;