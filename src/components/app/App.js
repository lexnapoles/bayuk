import React, {PropTypes, Component} from "react";
import {connect} from "react-redux";
import styles from "../layout.css";
import CSSModules from "react-css-modules";
import HomeHeader from "../header/homeHeader/HomeHeader";
import ProductTableContainer from "../products/productTable/ProductTableContainer";
import {loadProducts} from "../../actions/products";
import {loadGeolocation} from "../../actions/users";
import {loadCategories} from "../../actions/categories";

const DEFAULT_MADRID_COORDS = {
	latitude:  40.416,
	longitude: 3.7
};

const loadData = ({loadProducts, loadCategories, loadGeolocation}, coords = DEFAULT_MADRID_COORDS) => {
	const query = {
		sort:      "distance",
		order:     "descending",
		radius:    99999,
		latitude:  coords.latitude,
		longitude: coords.longitude
	};

	loadGeolocation(coords);
	loadCategories();
	loadProducts(query);
};


class App extends Component {
	componentWillMount() {
		const success = ({coords}) => {
			loadData(this.props, coords);
		};

		const error = () => loadData(this.props);

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
	loadProducts:    PropTypes.func.isRequired,
	loadCategories:  PropTypes.func.isRequired,
	loadGeolocation: PropTypes.func.isRequired
};

export default connect(null, {
	loadProducts,
	loadCategories,
	loadGeolocation
})(CSSModules(App, styles));