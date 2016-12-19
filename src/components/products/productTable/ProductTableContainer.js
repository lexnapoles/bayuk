import {connect} from "react-redux";
import ProductTable from  "./ProductTable";
import {getAllProducts} from "../../../reducers/root";

const mapStateToProps = state => {
	const {items, isFetching} = getAllProducts(state);

	return {
		products: items,
		isFetching
	};
};

export default connect(mapStateToProps)(ProductTable);