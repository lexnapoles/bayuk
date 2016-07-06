import React, {Component} from "react";
import SearchForm from "./SearchForm";

class SearchFormContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name:       "",
			categories: {"Music": false, "Videgames": false, "Movies": false, "Literature": false},
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
		Object.assign(this.state.price, {
			[event.target.id]: event.target.value
		});

		this.setState({price: this.state.price});
	}

	onCategoryChange(event) {
		const name       = event.target.id,
					categories = this.state.categories;

		Object.assign(categories, {
			[name]: !categories[name]
		});

		this.setState({categories});
	}

	render() {
		return (
			<SearchForm
				name={this.state.name}
				categories={this.state.categories}
				submitForm={this.submitForm}
				onNameChange={this.onNameChange}
				onCategoryChange={this.onCategoryChange}
				onPriceChange={this.onPriceChange} />
		);
	}
}

export default SearchFormContainer;
