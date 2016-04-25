import React, {Component} from "react";
import Header from "../Header/Header";
import ProductTable from "../Products/ProductTable/ProductTable";
import styles from "./app.css";

class App extends Component {
	render() {
		const {products} = this.props,
					{container, header, main, aside1, aside2, footer} = styles;

		return (
			<div className={container}>
				<header className={header}>
					<Header />
				</header>
				<main className={main}>
					<ProductTable products={products}/>
				</main>
				<aside className={aside1}>&nbsp;</aside>
				<aside className={aside2}>&nbsp;</aside>
				<footer className={footer}>&nbsp;</footer>
			</div>
		)
	}
}

App.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default App;