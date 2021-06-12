import "normalize.css/normalize.css";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import Root from "./components/Root/Root";

if (module.hot) {
  module.hot.accept();
}

const store = configureStore();

render(<Root store={store} />, document.querySelector(".app"));
