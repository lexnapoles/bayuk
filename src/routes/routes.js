import React, {Component} from "react";
import {Router, Route, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from "../store/store";
import App from "../components/app/App";
import SearchFormContainer from "../components/searchForm/SearchFormContainer";
import ProductDetails from "../components/products/productDetails/ProductDetails";

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="search" component={SearchFormContainer}/>
		<Route path="product" component={ProductDetails}/>
	</Router>
);

class Routes extends Component {
	render() {
		return (
			<Provider store={store}>
			{routes}
		</Provider>
		);
	}
}
export default Routes;

