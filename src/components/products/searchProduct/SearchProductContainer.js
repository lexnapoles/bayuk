import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import connectForm from '../../form/connectForm/connectForm';
import { onRangeChange } from '../../form/formHandlers';
import SearchProduct from './SearchProduct';
import loadCategories from '../../../actions/categories';
import { loadSearchedProducts, newSearch } from '../../../actions/products';
import getParamsFromForm from '../../../services/getParamsFromSearchForm';
import { getAllCategories } from '../../../reducers/root';
import { createDefaultObjectFrom, isCheckBoxChecked, isNotEmpty } from '../../../utils';
import errorMsgs from '../../form/errors/errorsMsgs';
import {
  NO_NAME_FILLED,
  NO_CATEGORY_FILLED,
  NO_LOCATION_SELECTED,
  NO_DISTANCE_SELECTED,
  NO_SORT_SELECTED, NO_PRICE_FILLED,
} from '../../form/errors/errorConstants';
import { CUSTOM_FILTER } from '../../../constants/productFilters';

const loadData = ({ loadCategories: load }) => load();

const elements = ['name', 'categories', 'price', 'distance', 'location', 'sort'];

const isPriceRangeDefined = ({ min, max }) => Number.isInteger(min) && Number.isInteger(max);

const validation = {
  name: isNotEmpty,
  categories: isCheckBoxChecked,
  distance: isCheckBoxChecked,
  sort: isCheckBoxChecked,
  location: ({ latitude, longitude }) => latitude && longitude,
  price: isPriceRangeDefined,
};

const errorMessages = {
  name: errorMsgs[NO_NAME_FILLED],
  categories: errorMsgs[NO_CATEGORY_FILLED],
  distance: errorMsgs[NO_DISTANCE_SELECTED],
  sort: errorMsgs[NO_SORT_SELECTED],
  location: errorMsgs[NO_LOCATION_SELECTED],
  price: errorMsgs[NO_PRICE_FILLED],
};

const handlers = {
  onCategoriesChange: category => category,
  onDistanceChange: distance => distance,
  onSortChange: sort => sort,
  onPriceChange: onRangeChange.bind(undefined, 'price'),
  onLocationChange: coords => coords,
};

const getDefaultFormState = props => ({
  price: { min: 0, max: 999 },
  distance: {
    '1km': true,
    '5km': false,
    '10km': false,
    '>10km': false,
  },
  sort: {
    Expensive: false,
    Cheap: false,
    Distance: true,
    New: false,
  },
  ...props,
});

class SearchFormContainer extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  onSubmit(data) {
    const search = getParamsFromForm(data);

    this.props.newSearch();

    this.props.onSubmit(search);

    browserHistory.push('/results');
  }

  render() {
    const defaultFormState = getDefaultFormState({
      categories: createDefaultObjectFrom(this.props.categories, false),
    });

    const formProps = {
      elements,
      handlers,
      validation,
      errorMessages,
      defaultFormState,
      onSubmit: this.onSubmit,
    };

    return createElement(connectForm(formProps)(SearchProduct));
  }
}

SearchFormContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  newSearch: PropTypes.func.isRequired,
};

SearchFormContainer.defaultProps = {
  categories: {},
};

const mapStateToProps = state => ({
  categories: getAllCategories(state),
});

export default connect(mapStateToProps, {
  onSubmit: loadSearchedProducts,
  loadCategories,
  newSearch: newSearch.bind(undefined, CUSTOM_FILTER),
})(SearchFormContainer);
