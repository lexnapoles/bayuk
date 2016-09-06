import React, {Component} from "react";
import {Router, Route, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "../store/configureStore";
import App from "../components/app/App";
import SearchFormContainer from "../components/searchForm/SearchFormContainer";
import ProductDetails from "../components/products/productDetails/ProductDetails";

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="search" component={SearchFormContainer}/>
		<Route path="product/:productId" component={ProductDetails}/>
	</Router>
);

class Routes extends Component {
	render() {
		const store = configureStore();

		return (
			<Provider store={store}>
				{routes}
			</Provider>
		);
	}
}
export default Routes;

