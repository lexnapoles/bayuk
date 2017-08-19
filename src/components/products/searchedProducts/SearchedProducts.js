import { connect } from 'react-redux';
import ProductTable from '../productTable/ProductTable';
import { getSearchedProductsPagination, getListOfProductsById } from '../../../reducers/root';
import { loadSearchedProducts } from '../../../actions/products';

const mapStateToProps = (state) => {
  const pagination = getSearchedProductsPagination(state);

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination,
  };
};

export default connect(mapStateToProps, {
  onLoadMoreClick: loadSearchedProducts.bind(undefined, {}, true),
})(ProductTable);
