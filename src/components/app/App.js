import React, {Component} from "react";
import Header from "../header/Header";
import ProductTable from "../products/productTable/ProductTable";
import styles from "../layout.css";
import CSSModules from "react-css-modules";

class App extends Component {
	render() {
		const {products} = this.props;

		return (
			<div styleName="container">
				<Header />
				<main styleName="main">
					<ProductTable products={products}/>
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