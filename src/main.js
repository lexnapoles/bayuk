import "file?name=index.html!./index.html";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

if (module.hot) {
	module.hot.accept();
}

const PRODUCTS = [
	{id: 1, photo: "http://placehold.it/140x100", name: "Vetusta", category: "music", price: 10},
	{id: 2, photo: "http://placehold.it/140x100", name: "Golding", category: "movie", price: 20},
	{id: 3, photo: "http://placehold.it/140x100", name: "Videogame", category: "videogames", price: 50},
	{id: 4, photo: "http://placehold.it/140x100", name: "Journey", category: "books", price: 100}
]

ReactDOM.render(<App products={PRODUCTS}/>, document.querySelector(".wrapper"));
