import {connect} from "react-redux";
import {addProduct} from "../../../actions/api";
import {findKey} from "lodash/object";
import {isNotEmpty} from "../../../../utils/utils";
import connectForm from "../../form/connectForm/connectForm";
import {isLoggedIn} from "../../../reducers/root";
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
	onCategoryChange: categories => {
		const category = findKey(categories, category => category);

		return category ? category : ""
	}
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

const mapStateToProps = (state) => {
	const {rehydrated} = getCurrentUser(state);

	return {
		isLoggedIn: isLoggedIn(state),
		rehydrated
	};
}

export default connect(mapStateToProps, {
	onSubmit: addProduct
})(addAuthenticationTo(connectForm(props)(AddProduct)));