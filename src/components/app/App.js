import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "../layout.css";
import CSSModules from "react-css-modules";
import HomeHeader from "../header/homeHeader/HomeHeader";
import ProductTableContainer from "../products/productTable/ProductTableContainer";
import {loadProducts} from "../../actions/products";
import {loadCategories} from "../../actions/categories";

const DEFAULT_MADRID_COORDS = {
	latitude:  40.416,
	longitude: 3.7
};

const loadData = ({loadProducts, loadCategories}, {latitude, longitude} = DEFAULT_MADRID_COORDS) => {
	const query = {
		sort:      "distance",
		order:     "descending",
		radius:    99999,
		latitude,
		longitude
	};

	loadCategories();
	loadProducts(query);
};


class App extends Component {
	componentWillMount() {
		const success = ({coords}) => loadData(this.props, coords),
					error   = () => loadData(this.props);

		navigator.geolocation.getCurrentPosition(success, error);
	}

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

App.propTypes = {
	loadProducts:   React.PropTypes.func.isRequired,
	loadCategories: React.PropTypes.func.isRequired
};

export default connect(null, {
	loadProducts,
	loadCategories
})(CSSModules(App, styles));