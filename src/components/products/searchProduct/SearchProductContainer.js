import React, {Component} from "react";
import SearchProduct from "./SearchProduct";

class SearchProductContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name:       "",
			categories: {},
			price:      {min: 0, max: 0}
		};

		this.submitForm = this.submitForm.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
	}

	submitForm(event) {
		event.preventDefault();

	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	onPriceChange(event) {
		const price = {
			...this.state.price,
			[event.target.id]: event.target.value
		};

		this.setState({price});
	}

	onCategoryChange(categories) {
		this.setState({categories});
	}

	render() {
		return (
			<SearchProduct
				name={this.state.name}
				submitForm={this.submitForm}
				onNameChange={this.onNameChange}
				onCategoryChange={this.onCategoryChange}
				onPriceChange={this.onPriceChange}/>
		);
	}
}

export default SearchProductContainer;