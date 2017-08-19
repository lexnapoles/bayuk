import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import connectForm from '../../form/connectForm/connectForm';
import { onRangeChange } from '../../form/formHandlers';
import SearchProduct from './SearchProduct';
import loadCategories from '../../../actions/categories';
import { loadSearchedProducts, newSearch } from '../../../actions/products';
import getParamsFromSearch from '../../../services/search';
import { getAllCategories } from '../../../reducers/root';
import { createDefaultObjectFrom } from '../../../utils';

const loadData = ({ loadCategories: load }) => load();

const elements = ['name', 'categories', 'price', 'distance', 'location', 'sort'];

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

const handlers = {
  onCategoriesChange: category => category,
  onDistanceChange: distance => distance,
  onSortChange: sort => sort,
  onPriceChange: onRangeChange.bind(undefined, 'price'),
  onLocationChange: coords => coords,
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
    const defaultFormState = getDefaultFormState({
      categories: createDefaultObjectFrom(this.props.categories, false),
    });

    const formProps = {
      elements,
      handlers,
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
  newSearch,
})(SearchFormContainer);
