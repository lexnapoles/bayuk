import {connect} from "react-redux";
import ProductTable from  "./ProductTable";

const mapStateToProps = (state) => ({
	products: state.products
});

export default connect(mapStateToProps)(ProductTable);