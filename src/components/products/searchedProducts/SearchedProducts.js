import { connect } from 'react-redux';
import ProductTable from '../productTable/ProductTable';
import { getListOfProductsById, getProductsByFilter } from '../../../reducers/root';
import { loadSearchedProducts } from '../../../actions/products';
import { CUSTOM_FILTER } from '../../../constants/productFilters';

const mapStateToProps = (state) => {
  const pagination = getProductsByFilter(state, CUSTOM_FILTER) || {};

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination,
  };
};

export default connect(mapStateToProps, {
  onLoadMoreClick: loadSearchedProducts.bind(undefined, {}, true),
})(ProductTable);
