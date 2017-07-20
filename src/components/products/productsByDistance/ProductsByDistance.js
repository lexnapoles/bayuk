import {connect} from "react-redux";
import ProductTable from "../productTable/ProductTable";
import {getProductsByDistancePagination} from "../../../reducers/root";
import {getListOfProductsById} from "../../../reducers/root";
import {loadProductsByDistance} from "../../../actions/products";

const mapStateToProps = state => {
  const pagination = getProductsByDistancePagination(state);

  const filteredProducts = getListOfProductsById(state, pagination.ids);

  return {
    products: filteredProducts,
    ...pagination
  };
};

export default connect(mapStateToProps, {
  onLoadMoreClick: loadProductsByDistance.bind(void 0, {}, true)
})(ProductTable);