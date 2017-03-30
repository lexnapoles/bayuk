import "file-loader?name=index.html!./index.html";
import "normalize.css/normalize.css";
import React from "react";
import {render} from "react-dom";
import configureStore from "./store/configureStore";
import Root from "./components/Root/Root";
import initApp from "./actions/initApp";

if (module.hot) {
	module.hot.accept();
}

const store = configureStore();

initApp(store);

render(<Root store={store}/>, document.querySelector(".app"));
