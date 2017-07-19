import {Component, createElement} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import connectForm from "../../form/connectForm/connectForm";
import {onCheckBoxChange, onRangeChange} from "../../form/formHandlers";
import SearchProduct from "./SearchProduct";
import {loadCategories} from "../../../actions/categories";
import {loadSearchedProducts} from "../../../actions/products";
import getParamsFromSearch from "../../../services/search";
import {browserHistory} from "react-router";

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
  defaultFormState
};

class SearchFormContainer extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  onSubmit(data) {
    const search = getParamsFromSearch(data);

    this.props.onSubmit(search);

    browserHistory.push("/results");
  }

  render() {
    const formProps = {
      ...props,
      onSubmit: this.onSubmit
    };

    return createElement(connectForm(formProps)(SearchProduct));
  }
}

SearchFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default connect(void 0, {
  loadCategories,
  onSubmit: loadSearchedProducts
})(SearchFormContainer);