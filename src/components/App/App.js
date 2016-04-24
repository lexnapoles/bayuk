import React, {Component} from "react";
import Header from "../Header/Header";
import ProductTable from "../Products/ProductTable/ProductTable";

class App extends Component {
	render() {
		const {products} = this.props;

		return (
			<main>
				<Header />
				<ProductTable products={products}/>
			</main>
		)
	}
}

App.propTypes = {
	products: React.PropTypes.array.isRequired
};

export default App;