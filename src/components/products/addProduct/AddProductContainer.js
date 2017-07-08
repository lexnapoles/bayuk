import {Component, createElement} from "react";
import {omit} from "lodash/object";
import {connect} from "react-redux";
import {loadCategories} from "../../../actions/categories";
import {addProduct} from "../../../actions/api";
import {onCheckBoxChange} from "../../form/formHandlers";
import {isNotEmpty} from "../../../utils";
import connectForm from "../../form/connectForm/connectForm";
import {isUserLoggedIn} from "../../../reducers/root";
import {getCurrentUser} from "../../../reducers/root";
import addAuthenticationTo from "../../auth/addAuthenticationTo/addAuthenticationTo";
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

const elements = ["name", "description", "category", "price", "images"];

const validation = {
	name:        isNotEmpty,
	description: isNotEmpty,
	category:    isNotEmpty,
	images:      isNotEmpty,
	price:       price => price > 0
};

const handlers = {
	onPriceChange:    event => parseInt(event.target.value),
	onImagesChange:   images => images,
	onCategoryChange: onCheckBoxChange
};

const errorMessages = {
	name:        errorMsgs[NO_NAME_FILLED],
	description: errorMsgs[NO_DESCRIPTION_FILLED],
	category:    errorMsgs[NO_CATEGORY_FILLED],
	images:      errorMsgs[NO_IMAGES_FILLED],
	price:       errorMsgs[NO_PRICE_FILLED]
};

const props = {
	elements,
	validation,
	handlers,
	errorMessages,
	maxImages: MAX_IMAGES
};

const loadData = ({loadCategories}) => loadCategories();

class AddProductContainer extends Component {
	componentWillMount() {
		loadData(this.props);
	}

	render() {
		return createElement(addAuthenticationTo(connectForm(props)(AddProduct)), omit(this.props, "loadCategories"));
	}
}

const mapStateToProps = (state) => {
	const user = getCurrentUser(state) || {};

	return {
		isLoggedIn: isUserLoggedIn(state),
		user
	};
};


export default connect(mapStateToProps, {
	onSubmit: addProduct,
	loadCategories
})(AddProductContainer);