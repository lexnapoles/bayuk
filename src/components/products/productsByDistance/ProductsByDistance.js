import { connect } from 'react-redux';
import ProductTable from '../productTable/ProductTable';
import { getListOfProductsById, getProductsByFilter } from '../../../reducers/root';
import { loadProductsByDistance } from '../../../actions/products';
import { DISTANCE_FILTER } from '../../../constants/productFilters';

const mapStateToProps = (state) => {
  const pagination = getProductsByFilter(state, DISTANCE_FILTER) || {};

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination,
  };
};

export default connect(mapStateToProps, {
  onLoadMoreClick: loadProductsByDistance.bind(undefined, {}, true),
})(ProductTable);
