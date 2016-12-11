import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Link} from "react-router";
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
		return (
			<div>
				<div styleName="container">
					{this.renderProducts(this.props.products)}
				</div>
				<div styleName="addButtonContainer">
					<Link styleName="addButton" to={"/add"}>
						<Icon name="plus-circle" size="4x"/>
					</Link>
				</div>
			</div>
		)
	}
}

ProductTable.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default CSSModules(ProductTable, styles);