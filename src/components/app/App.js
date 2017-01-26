import React, {Component} from "react";
import HomeHeader from "../header/homeHeader/HomeHeader";
import ProductTableContainer from "../products/productTable/ProductTableContainer";
import styles from "../layout.css";
import CSSModules from "react-css-modules";

class App extends Component {
	render() {
		return (
			<div styleName="container">
				<HomeHeader/>
				<main styleName="main">
					<ProductTableContainer/>
				</main>
				<footer></footer>
			</div>
		)
	}
}

export default CSSModules(App, styles);