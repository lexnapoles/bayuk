import {connect} from "react-redux";
import {addProduct} from "../../../actions/api";
import {findKey} from "lodash/object";
import FormWrapper from "../../form/FormWrapper";
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

const validateStringOrArray = data => data.length;

const validation = {
	name:        validateStringOrArray,
	description: validateStringOrArray,
	category:    validateStringOrArray,
	images:      validateStringOrArray,
	price:       price => price > 0
};

const handlers = {
	onPriceChange:    event => parseInt(event.target.value),
	onImagesChange:    images => images,
	onCategoryChange: categories => findKey(categories, category => category)
};

const errorMessages = {
	name:        errorMsgs[NO_NAME_FILLED],
	description: errorMsgs[NO_DESCRIPTION_FILLED],
	category:    errorMsgs[NO_CATEGORY_FILLED],
	images:      errorMsgs[NO_IMAGES_FILLED],
	price:       errorMsgs[NO_PRICE_FILLED]
};

const mapStateToProps = () => ({
	elements,
	validation,
	handlers,
	errorMessages,
	maxImages: MAX_IMAGES
});

export default connect(mapStateToProps, {
	onSubmit: addProduct
})(FormWrapper(AddProduct));