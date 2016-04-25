import React, {Component} from "react";
import Header from "../Header/Header";
import ProductTable from "../Products/ProductTable/ProductTable";
import styles from "./app.css";

class App extends Component {
	render() {
		const {products} = this.props,
					{container, main} = styles;

		return (
			<div className={container}>	
				<header>
					<Header />
				</header>
				<main className={main}>
					<ProductTable products={products}/>
				</main>
				<footer></footer>
			</div>
		)
	}
}

App.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default App;