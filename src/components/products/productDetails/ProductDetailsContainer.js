import {connect} from "react-redux";
import ProductDetails from "./ProductDetails";
import {getProductById} from "../../../reducers/root";
import {getImagePath} from "../../../utils/utils";

const mapStateToProps = (state, {params}) => {
	const {name, images, description, price} = getProductById(state, params.id);

	return {
		name,
		images: images.map(getImagePath),
		description,
		price: parseInt(price)
	}
};

export default connect(mapStateToProps)(ProductDetails);