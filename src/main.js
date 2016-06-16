import "file?name=index.html!./index.html";
import "normalize.css/normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";

if (module.hot) {
	module.hot.accept();
}

ReactDOM.render(<App />, document.querySelector(".app"));
