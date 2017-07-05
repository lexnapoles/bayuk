import {Component, createElement} from "react";
import {connect} from "react-redux";
import connectForm from "../../form/connectForm/connectForm";
import {onCheckBoxChange, onRangeChange} from "../../form/formHandlers";
import SearchProduct from "./SearchProduct";
import {loadCategories} from "../../../actions/categories";

const loadData = ({loadCategories}) => loadCategories();

const elements = ["name", "category", "price", "distance", "location", "sort"];

const defaultFormState = {
	price: {min: 0, max: 0}
};

const handlers = {
	onCategoryChange: onCheckBoxChange,
	onDistanceChange: onCheckBoxChange,
	onSortChange:     onCheckBoxChange,
	onPriceChange:    onRangeChange.bind(void 0, "price"),
	onLocationChange: coords => coords
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