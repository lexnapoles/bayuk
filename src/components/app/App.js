import React, {Component} from "react";
import HomeHeader from "../header/homeHeader/HomeHeader";
import ProductTable from "../products/productTable/ProductTable";
import styles from "../layout.css";
import CSSModules from "react-css-modules";
import PRODUCTS from "../../product_samples";

class App extends Component {
	render() {
		return (
			<div styleName="container">
				<HomeHeader  />
				<main styleName="main">
					<ProductTable products={PRODUCTS}/>
				</main>
				<footer></footer>
			</div>
		)
	}
}

export default CSSModules(App, styles);