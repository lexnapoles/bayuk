import PropTypes from 'prop-types';
import React, {Component} from "react";
import {browserHistory} from "react-router";
import Spinner from "../../spinner/Spinner";
import ProductOverview from "../productOverview/ProductOverview";
import {container, spinner} from "./productTable.css";

class ProductTable extends Component {
	renderProducts(products) {
		return products.map(product =>
			<ProductOverview key={product.id} product={product} onClick={() => browserHistory.push(`/product/${product.id}`)}/>
		);
	}

	renderSpinner() {
		return (
			<main className={spinner}>
				<Spinner/>
			</main>
		);
	}

	renderLoadMore() {
		const {isFetching, onLoadMoreClick} = this.props;

		return (
			<button style={{fontSize: '150%'}}
							onClick={onLoadMoreClick}
							disabled={isFetching}>
				{isFetching ? <Spinner/> : "Load More"}
			</button>
		);
	}


	render() {
		const {isFetching, products, nextPageUrl, pageCount} = this.props;

		const isEmpty = !products.length;

		if (isEmpty && isFetching) {
			return this.renderSpinner();
		}

		const isLastPage = !nextPageUrl;

		if (isEmpty && isLastPage) {
			return <h1><i>"Sorry, there's nothing here!"</i></h1>
		}

		return (
			<div>
				<div>
					<div className={container}>
						{this.renderProducts(products)}
					</div>
					{pageCount > 0 && !isLastPage && this.renderLoadMore()}
					{this.props.children}
				</div>
			</div>
		);
	}
}

ProductTable.propTypes = {
	products:        PropTypes.array.isRequired,
	onLoadMoreClick: PropTypes.func.isRequired,
	isFetching:      PropTypes.bool.isRequired,
	children:        PropTypes.element,
	pageCount:       PropTypes.number,
	nextPageUrl:     PropTypes.string,
};

ProductTable.defaultProps = {
	isFetching: false
};

export default ProductTable;