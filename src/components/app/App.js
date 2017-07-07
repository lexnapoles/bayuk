import PropTypes from 'prop-types';
import React, {Component} from "react";
import {connect} from "react-redux";
import {container, main} from "../layout.css";
import HomeHeader from "./homeHeader/HomeHeader";
import ProductsByDistance from "../products/productsByDistance/ProductsByDistance";
import {loadProducts} from "../../actions/products";
import {loadCategories} from "../../actions/categories";
import {loadGeolocation} from "../../actions/users";
import geolocated from "../geolocated/geolocated";
import {getGeolocation} from "../../reducers/root";
import AddIcon from "../icons/addIcon/AddIcon";
import {addButtonContainer} from "./app.css";

const loadData = ({loadProducts, loadCategories, loadGeolocation, latitude, longitude}) => {
	const query = {
		sort:   "distance",
		order:  "descending",
		radius: 99999,
		latitude,
		longitude
	};

	loadGeolocation({latitude, longitude});
	loadCategories();
	loadProducts(query);
};

class App extends Component {
	componentWillMount() {
		loadData(this.props);
	}

	render() {
		return (
			<div className={container}>
				<HomeHeader/>
				<main className={main}>
					<ProductsByDistance>
						<div className={addButtonContainer}>
							<AddIcon/>
						</div>
					</ProductsByDistance>
				</main>
				<footer></footer>
			</div>
		)
	}
}

App.propTypes = {
	loadProducts:   PropTypes.func.isRequired,
	loadCategories: PropTypes.func.isRequired,
	latitude:       PropTypes.number.isRequired,
	longitude:      PropTypes.number.isRequired
};

const mapStateToProps = state => {
	const coords = getGeolocation(state);

	return {
		isAlreadyLocated: Boolean(coords),
		coords:           coords ? coords : null
	};
};

export default connect(mapStateToProps, {
	loadProducts,
	loadCategories,
	loadGeolocation
})(geolocated(App));