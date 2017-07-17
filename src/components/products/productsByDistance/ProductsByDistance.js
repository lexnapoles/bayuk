import {connect} from "react-redux";
import ProductTable from  "../productTable/ProductTable";
import {getProductsByDistancePagination} from "../../../reducers/root";
import {getListOfProductsById} from "../../../reducers/root";

const mapStateToProps = state => {
	const pagination = getProductsByDistancePagination(state);

	const filteredProducts = getListOfProductsById(state, pagination.ids);

	return {
		products: filteredProducts,
		...pagination,
		onLoadMoreClick: () => void 0
	};
};

export default connect(mapStateToProps)(ProductTable);