import {Component, createElement} from "react";
import {connect} from "react-redux";
import connectForm from "../../form/connectForm/connectForm";
import SearchProduct from "./SearchProduct";
import {loadCategories} from "../../../actions/categories";

const loadData = ({loadCategories}) => loadCategories();

const elements = ["name", "categories", "price"];

const defaultFormState = {
	price: {min: 0, max: 0}
};

const handlers = {
	onCategoriesChange: categories => categories,
	onPriceChange:      (event, {price}) => ({
		...price,
		[event.target.id]: parseInt(event.target.value)
	})
};

const props = {
	elements,
	handlers,
	defaultFormState,
	onSubmit: () => void 0
};

class SearchFormContainer extends Component {
	componentWillMount() {
		loadData(this.props);
	}

	render() {
		return createElement(connectForm(props)(SearchProduct));
	}
}

export default connect(void 0, {
	loadCategories
})(SearchFormContainer);