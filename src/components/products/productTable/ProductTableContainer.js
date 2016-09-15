import {connect} from "react-redux";
import ProductTable from  "./ProductTable";

const mapStateToProps = (state) => ({
	products: state.products
});

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps)(ProductTable);