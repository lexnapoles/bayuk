import {connect} from "react-redux";
import {addProduct} from "../../../actions/products";
import React, {Component} from "react";
import AddProduct from "./AddProduct";

const MAX_IMAGES = 3;

class AddProductContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name:        "",
			description: "",
			categories:  {"Music": false, "Videgames": false, "Movies": false, "Literature": false},
			price:       0,
			images:      []
		};

		this.submitForm = this.submitForm.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onImagesChange = this.onImagesChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
	}

	submitForm(event) {
		event.preventDefault();

		this.props.onSubmit(this.state);
	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	onImagesChange(images) {
		this.setState({images});
	}

	onDescriptionChange(event) {
		this.setState({description: event.target.value});
	}

	onPriceChange(event) {
		this.setState({price: parseInt(event.target.value)});
	}

	getCategoriesObject(category) {
		const categories = this.state.categories,
					keys       = Object.keys(categories);

		const newCategories = keys.reduce((categoriesObj, key) => {
			const value = key === category

				? !categories[key]
				: false;

			return Object.assign(categoriesObj, {
				[key]: value
			});
		}, {});

		return newCategories;
	}

	onCategoryChange(event) {
		const name = event.target.id;

		this.setState({
			categories: this.getCategoriesObject(name)
		});
	}

	render() {
		return (
			<AddProduct
				product={this.state}
				maxImages={MAX_IMAGES}
				submitForm={this.submitForm}
				onNameChange={this.onNameChange}
				onImagesChange={this.onImagesChange}
				onDescriptionChange={this.onDescriptionChange}
				onCategoryChange={this.onCategoryChange}
				onPriceChange={this.onPriceChange}/>
		);
	}
}

AddProductContainer.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
}

export default connect(void 0, {
	onSubmit: addProduct
})(AddProductContainer);
