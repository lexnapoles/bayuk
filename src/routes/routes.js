import React from "react";
import {Router, Route, browserHistory} from "react-router";
import App from "../components/app/App";
import SearchFormContainer from "../components/searchForm/SearchFormContainer";
import ProductDetailsContainer from "../components/products/productDetails/ProductDetailsContainer";

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="search" component={SearchFormContainer}/>
		<Route path="product/:id" component={ProductDetailsContainer}/>
	</Router>
);

export default routes;