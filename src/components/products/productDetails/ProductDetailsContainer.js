import {connect} from "react-redux";
import ProductDetails from "./ProductDetails";
import {getProductById} from "../../../reducers/products";

const mapStateToProps = (state, {id}) => ({
	product: getProductById(state, id)
});

export default connect(mapStateToProps)(ProductDetails);