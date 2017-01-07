import React, {Component} from "react";
import {connect} from "react-redux";
import {addProduct} from "../../../actions/api";
import AddProduct from "./AddProduct";
import errorMsgs from "../../form/errors/errorsMsgs";
import {
	NO_NAME_FILLED,
	NO_DESCRIPTION_FILLED,
	NO_CATEGORY_FILLED,
	NO_PRICE_FILLED,
	NO_IMAGES_FILLED
} from "../../form/errors/errorConstants";

const MAX_IMAGES = 3;

class AddProductContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: {
				name:        "",
				description: "",
				category:    "",
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
		this.onCategoriesChange = this.onCategoriesChange.bind(this);
	}

	submitForm(event) {
		event.preventDefault();

		const product = this.state.product;

		if (!this.validate(product)) {
			return;
		}

		this.props.onSubmit(product);
	}

	getUpdatedProduct(newProperty) {
		return {...this.state.product, ...newProperty};
	}

	validateName(name) {
		return name.length
			? ""
			: errorMsgs[NO_NAME_FILLED];
	}

	validateDescription(description) {
		return description.length
			? ""
			: errorMsgs[NO_DESCRIPTION_FILLED];
	}

	validateCategory(category) {
		return category.length
			? ""
			: errorMsgs[NO_CATEGORY_FILLED];
	}

	validatePrice(price) {
		return price > 0
			? ""
			: errorMsgs[NO_PRICE_FILLED];
	}

	validateImages(images) {
		return images.length
			? ""
			: errorMsgs[NO_IMAGES_FILLED];
	}

	errorExists(errors) {
		return Object.keys(errors).some(key => errors[key].length);
	}

	validate({name, description, category, price, images}) {
		const errors = {
			name:        this.validateName(name),
			description: this.validateDescription(description),
			categories:  this.validateCategory(category),
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
		const product = this.getUpdatedProduct({
			name: event.target.value
		});

		this.setState({product});
	}

	onImagesChange(images) {
		this.setState({
			product: this.getUpdatedProduct({images})
		});
	}

	onDescriptionChange(event) {
		const product = this.getUpdatedProduct({
			description: event.target.value
		});

		this.setState({product});
	}

	onPriceChange(event) {
		const product = this.getUpdatedProduct({
			price: parseInt(event.target.value)
		});

		this.setState({product});
	}

	getCategory(categories) {
		return Object.keys(categories).find(key => categories[key]);
	}

	onCategoriesChange(categories) {
		const category = this.getCategory(categories);

		this.setState({
			product: this.getUpdatedProduct({category})});
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
				onCategoryChange={this.onCategoriesChange}
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

export const component = AddProductContainer;