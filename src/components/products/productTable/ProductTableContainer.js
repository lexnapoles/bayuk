import {connect} from "react-redux";
import ProductTable from  "./ProductTable";
import {getAllProducts} from "../../../reducers/root";

const mapStateToProps = state => ({
	products: getAllProducts(state)
});

export default connect(mapStateToProps)(ProductTable);