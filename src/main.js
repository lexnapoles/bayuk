import "file?name=index.html!./index.html";
import "normalize.css/normalize.css";
import React from "react";
import {render} from "react-dom";
import configureStore from "./store/configureStore";
import Root from "./components/Root/Root";
import {fetchProducts} from "./actions/products";

if (module.hot) {
	module.hot.accept();
}

const store = configureStore();

store.dispatch(fetchProducts());

render(<Root store={store}/>, document.querySelector(".app"));
