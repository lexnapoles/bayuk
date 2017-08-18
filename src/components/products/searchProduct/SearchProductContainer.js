import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import connectForm from '../../form/connectForm/connectForm';
import { onCheckBoxChange, onRangeChange } from '../../form/formHandlers';
import SearchProduct from './SearchProduct';
import loadCategories from '../../../actions/categories';
import { loadSearchedProducts, newSearch } from '../../../actions/products';
import getParamsFromSearch from '../../../services/search';

const loadData = ({ loadCategories: load }) => load();

const elements = ['name', 'category', 'price', 'distance', 'location', 'sort'];

const defaultFormState = {
  price: { min: 0, max: 0 },
};

const handlers = {
  onCategoryChange: onCheckBoxChange,
  onDistanceChange: onCheckBoxChange,
  onSortChange: onCheckBoxChange,
  onPriceChange: onRangeChange.bind(undefined, 'price'),
  onLocationChange: coords => coords,
};

const formTemplate = {
  elements,
  handlers,
  defaultFormState,
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

    this.props.newSearch();

    this.props.onSubmit(search);

    browserHistory.push('/results');
  }

  render() {
    const formProps = {
      ...formTemplate,
      onSubmit: this.onSubmit,
    };

    return createElement(connectForm(formProps)(SearchProduct));
  }
}

SearchFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  newSearch: PropTypes.func.isRequired,
};


export default connect(undefined, {
  onSubmit: loadSearchedProducts,
  loadCategories,
  newSearch,
})(SearchFormContainer);
