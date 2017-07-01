import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "../layout.css";
import CSSModules from "react-css-modules";
import HomeHeader from "../header/homeHeader/HomeHeader";
import ProductTableContainer from "../products/productTable/ProductTableContainer";
import {loadProducts} from "../../actions/products";

const DEFAULT_MADRID_COORDS = {
	latitude:  40.416,
	longitude: 3.7
};

const loadData = (loadProducts, coords = DEFAULT_MADRID_COORDS) => {
	const query = {
		sort:      "distance",
		order:     "descending",
		radius:    99999,
		latitude:  coords.latitude,
		longitude: coords.longitude
	};

	return loadProducts(query);
};


class App extends Component {
	componentWillMount() {
		const {loadProducts} = this.props;

		const success = ({coords}) => loadData(loadProducts, coords),
					error   = () => loadData(loadProducts);

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
	loadProducts: React.PropTypes.func
};

export default connect(null, {
	loadProducts
})(CSSModules(App, styles));