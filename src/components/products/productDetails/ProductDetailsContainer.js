import {connect} from "react-redux";
import ProductDetails from "./ProductDetails";
import {getProductById} from "../../../reducers/root";

const mapStateToProps = (state, {params}) => {
	const {name, images, description, price} = getProductById(state, params.id);

	return {
		name,
		images,
		description,
		price
	}
};

export default connect(mapStateToProps)(ProductDetails);