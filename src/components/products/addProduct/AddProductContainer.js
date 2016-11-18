import React, {Component} from "react";
import {connect} from "react-redux";
import {addProduct} from "../../../actions/products";
import AddProduct from "./AddProduct";
import {createDefaultObjectFrom} from "../../../utils/objectUtils";
import {
	NO_NAME_FILLED,
	NO_DESCRIPTION_FILLED,
	NO_CATEGORY_FILLED,
	NO_PRICE_FILLED,
	NO_IMAGES_FILLED
} from "./errorConstants";
import errorMsgs from "./errorsMsgs";
const MAX_IMAGES = 3;

class AddProductContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: {
				name:        "",
				description: "",
				categories:  {"Music": false, "Videogames": false, "Movies": false, "Literature": false},
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

		if (!this.validate(this.state.product)) {
			return;
		}

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
		return Object.keys(categories).find(key => categories[key]);
	}

	getUpdatedProductWith(newProperty) {
		return Object.assign({}, this.state.product, newProperty);
	}

	validateName(name) {
		return name.length ? "" : errorMsgs[NO_NAME_FILLED];
	}

	validateDescription(description) {
		return description.length ? "" : errorMsgs[NO_DESCRIPTION_FILLED];
	}

	validateCategories(categories) {
		return this.getCategory(categories) ?  "" : errorMsgs[NO_CATEGORY_FILLED];
	}

	validatePrice(price) {
		return price > 0 ? "" : errorMsgs[NO_PRICE_FILLED];
	}

	validateImages(images) {
		return images.length ? "" : errorMsgs[NO_IMAGES_FILLED];
	}

	errorExists(errors) {
		return Object.keys(errors).some(key => errors[key].length);
	}

	validate({name, description, categories, price, images}) {
		const errors = {
			name:        this.validateName(name),
			description: this.validateDescription(description),
			categories:  this.validateCategories(categories),
			price:       this.validatePrice(price),
			images:      this.validateImages(images)
		};

		if (this.errorExists(errors)) {
			this.setState({errors});

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

	getUpdatedCategories(category) {
		const {categories} = this.state.product,
					DEFAULT_CATEGORY_VALUE = false,
					newCategories = createDefaultObjectFrom(categories, DEFAULT_CATEGORY_VALUE);

		newCategories[category] = !categories[category];

		return newCategories;
	}

	onCategoryChange(event) {
		const category = event.target.id,
					product  = this.getUpdatedProductWith({
						categories: this.getUpdatedCategories(category)
					});

		this.setState({product});
	}

	render() {
		return (
			<AddProduct
				product={this.state.product}
				errors={this.state.errors}
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