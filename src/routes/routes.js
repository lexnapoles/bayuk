import React from "react";
import {Router, Route, browserHistory} from "react-router";
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

export default routes;