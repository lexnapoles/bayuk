import "file?name=index.html!./index.html";
import "normalize.css/normalize.css";
import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";

import App from "./components/app/App";
import SearchFormContainer from "./components/searchForm/SearchFormContainer";
import ProductDetails from "./components/products/productDetails/ProductDetails";

if (module.hot) {
	module.hot.accept();
}

render((
	<Router history={browserHistory}>
		<Route path="/" component={App} />
		<Route path="search" component={SearchFormContainer} />
		<Route path="product" component={ProductDetails} />
	</Router>
), document.querySelector(".app"));
