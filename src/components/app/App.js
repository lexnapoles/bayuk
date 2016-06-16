import React, {Component} from "react";
import Header from "../header/Header";
import ProductTable from "../products/productTable/ProductTable";
import styles from "../layout.css";
import CSSModules from "react-css-modules";
import PRODUCTS from "../../product_samples";

class App extends Component {
	render() {
		return (
			<div styleName="container">
				<Header />
				<main styleName="main">
					<ProductTable products={PRODUCTS}/>
				</main>
				<footer></footer>
			</div>
		)
	}
}

App.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default CSSModules(App, styles);