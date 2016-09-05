import "file?name=index.html!./index.html";
import "normalize.css/normalize.css";
import React from "react";
import {render} from "react-dom";
import Routes from "./routes/Routes";

if (module.hot) {
	module.hot.accept();
}

render(<Routes/>, document.querySelector(".app"));
