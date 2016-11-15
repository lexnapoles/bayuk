import React, {Component} from "react";
import {connect} from "react-redux";
import {addProduct} from "../../../actions/products";
import AddProduct from "./AddProduct";
import {NO_NAME_FILLED} from "./errorConstants";
import errorMsgs from "./errorsMsgs";
const MAX_IMAGES = 3;

class AddProductContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: {
				name:        "",
				description: "",
				categories:  {"Music": false, "Videgames": false, "Movies": false, "Literature": false},
				price:       0,
				images:      []
			},
			errors:  {
				name:        "",
				description: "",
				categories:  "",
				price:       "",
				images:      ""
			}
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

		const {name, description, categories, price, images} = this.state.product;

		const product = {
			name,
			description,
			category: this.getCategory(categories),
			price,
			images
		};

		this.props.onSubmit(product);
	}

	getCategory(categories) {
		const keys = Object.keys(categories);

		return keys.find(key => categories[key]);
	}

	getUpdatedProductWith(newProperty) {
		return Object.assign({}, this.state.product, newProperty);
	}

	setNameError() {
		this.setState({
			errors: {
				name: errorMsgs[NO_NAME_FILLED]
			}
		});
	}

	isProductIncomplete({name, description, categories, price, images}) {
		const isCategorySelected = this.getCategory(categories),
					incomplete         = !name.length || !description.length || !isCategorySelected || price <= 0 || !images.length;

		if (!name.length) {
			this.setNameError();
		}

		return incomplete;
	}

	validate(product) {
		if (this.isProductIncomplete(product)) {
			return false;
		}

		return true;
	}

	onNameChange(event) {
		const product = this.getUpdatedProductWith({
			name: event.target.value
		});

		this.setState({product});
	}

	onImagesChange(images) {
		const product = this.getUpdatedProductWith({images});

		this.setState({product});
	}

	onDescriptionChange(event) {
		const product = this.getUpdatedProductWith({
			description: event.target.value
		})

		this.setState({product});
	}

	onPriceChange(event) {
		const product = this.getUpdatedProductWith({
			price: parseInt(event.target.value)
		});

		this.setState({product});
	}

	getCategoriesObject(category) {
		const {categories} = this.state.product,
					keys         = Object.keys(categories);

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
		const name    = event.target.id,
					product = this.getUpdatedProductWith({
						categories: this.getCategoriesObject(name)
					});

		this.setState({product});
	}

	render() {
		return (
			<AddProduct
				product={this.state.product}
				maxImages={MAX_IMAGES}
				submitForm={this.submitForm}
				onNameChange={this.onNameChange}
				onImagesChange={this.onImagesChange}
				onDescriptionChange={this.onDescriptionChange}
				onCategoryChange={this.onCategoryChange}
				onPriceChange={this.onPriceChange}
				error={this.state.error}/>
		);
	}
}

AddProductContainer.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
}

export default connect(void 0, {
	onSubmit: addProduct
})(AddProductContainer);

export const component = AddProductContainer;