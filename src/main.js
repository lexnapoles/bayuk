import "file?name=index.html!./index.html";
import "normalize.css/normalize.css";
import React from "react";
import {render} from "react-dom";
import App from "./components/app/App";
import {Router, Route, browserHistory} from "react-router";

if (module.hot) {
	module.hot.accept();
}

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
		</Route>
	</Router>
), document.querySelector(".app"));
