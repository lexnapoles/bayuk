import { connect } from 'react-redux';
import ProductTable from '../productTable/ProductTable';
import { getListOfProductsById, getProductsByFilter } from '../../../reducers/root';
import { loadProductsByFilter } from '../../../actions/products';

const mapStateToProps = (state, { filter }) => {
  const pagination = getProductsByFilter(state, filter) || {};

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination,
  };
};

const mapDispatchToProps = (dispatch, { filter }) => ({
  onLoadMoreClick: () => dispatch(loadProductsByFilter(filter, {}, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
