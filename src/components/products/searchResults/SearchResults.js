import React from "react";
import {container, main} from "../../layout.css";
import ResultsHeader from "./resultsHeader/ResultsHeader";
import ProductTableContainer from "../productTable/ProductTableContainer";

const SearchResult = () =>
	<div className={container}>
		<ResultsHeader/>
		<main className={main}>
			<ProductTableContainer/>
		</main>
	</div>;

export default SearchResult;