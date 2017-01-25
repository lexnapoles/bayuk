import React from "react";
import {Router, Route, browserHistory} from "react-router";
import App from "../components/app/App";
import SearchProductContainer from "../components/products/searchProduct/SearchProductContainer";
import ProductDetailsContainer from "../components/products/productDetails/ProductDetailsContainer";
import AddProductContainer from "../components/products/addProduct/AddProductContainer";
import CreateAccount from "../components/auth/Register";
import LogIn from "../components/auth/LogIn";
import AuthPage from "../components/auth/authPage/AuthPage";

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="search" component={SearchProductContainer}/>
		<Route path="product/:id" component={ProductDetailsContainer}/>
		<Route path="add" component={AddProductContainer}/>
		<Route path="register" component={CreateAccount}/>
		<Route path="login" component={LogIn}/>
		<Route path="auth" component={AuthPage}/>
	</Router>
);

export default routes;