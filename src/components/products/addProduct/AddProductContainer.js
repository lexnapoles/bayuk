import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash/object';
import { connect } from 'react-redux';
import loadCategories from '../../../actions/categories';
import { addProduct } from '../../../actions/api';
import { createDefaultObjectFrom, isNotEmpty, isCheckBoxChecked } from '../../../utils';
import connectForm from '../../form/connectForm/connectForm';
import { getAllCategories, isUserLoggedIn } from '../../../reducers/root';
import addAuthenticationTo from '../../auth/addAuthenticationTo/addAuthenticationTo';
import AddProduct from './AddProduct';
import errorMsgs from '../../form/errors/errorsMsgs';
import {
  NO_NAME_FILLED,
  NO_DESCRIPTION_FILLED,
  NO_CATEGORY_FILLED,
  NO_PRICE_FILLED,
  NO_IMAGES_FILLED,
} from '../../form/errors/errorConstants';

import getParamsFromForm from '../../../services/getParamsFromAddForm';

const MAX_IMAGES = 3;

const elements = ['name', 'description', 'categories', 'price', 'images'];

const validation = {
  name: isNotEmpty,
  description: isNotEmpty,
  categories: isCheckBoxChecked,
  images: isNotEmpty,
  price: price => price > 0,
};

const handlers = {
  onPriceChange: event => parseInt(event.target.value, 10),
  onImagesChange: images => images,
  onCategoriesChange: categories => categories,
};

const errorMessages = {
  name: errorMsgs[NO_NAME_FILLED],
  description: errorMsgs[NO_DESCRIPTION_FILLED],
  categories: errorMsgs[NO_CATEGORY_FILLED],
  images: errorMsgs[NO_IMAGES_FILLED],
  price: errorMsgs[NO_PRICE_FILLED],
};

const formTemplate = {
  elements,
  validation,
  errorMessages,
  handlers,
  maxImages: MAX_IMAGES,
};

const loadData = ({ loadCategories: load }) => load();

class AddProductContainer extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  onSubmit(data) {
    const productToAdd = getParamsFromForm(data);

    this.props.onSubmit(productToAdd);
  }

  render() {
    const { categories } = this.props;
    const props = omit(this.props, ['loadCategories', 'onSubmit']);

    const form = {
      ...formTemplate,
      onSubmit: this.onSubmit,
      defaultFormState: {
        categories: createDefaultObjectFrom(categories, false),
      },
    };

    return createElement(
      addAuthenticationTo(connectForm(form)(AddProduct)),
      props);
  }
}

AddProductContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
};

AddProductContainer.defaultProps = {
  categories: [],
};

const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
  categories: getAllCategories(state),
});


export default connect(mapStateToProps, {
  onSubmit: addProduct,
  loadCategories,
})(AddProductContainer);
