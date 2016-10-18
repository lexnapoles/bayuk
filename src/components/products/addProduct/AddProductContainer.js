import React, {Component} from "react";
import AddProduct from "./AddProduct";

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
		this.onImageChange = this.onImageChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
	}

	submitForm(event) {
		event.preventDefault();

	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	imageAlreadyExists(img) {
		return this.state.images.some(someImg => someImg.name === img.name);
	}

	onImageChange(image) {
		if (this.imageAlreadyExists(image)) {
			return;
		}

		this.setState({
			images: [...this.state.images, image]
		});
	}

	onDescriptionChange(event) {
		this.setState({description: event.target.value});
	}

	onPriceChange(event) {
		this.setState({price: event.target.value});
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
				submitForm={this.submitForm}
				onNameChange={this.onNameChange}
				onImageChange={this.onImageChange}
				onDescriptionChange={this.onDescriptionChange}
				onCategoryChange={this.onCategoryChange}
				onPriceChange={this.onPriceChange}/>
		);
	}
}

export default AddProductContainer;
