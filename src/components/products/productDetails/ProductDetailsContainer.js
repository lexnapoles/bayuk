import {connect} from "react-redux";
import ProductDetails from "./ProductDetails";
import {getProductById} from "../../../reducers/root";
import {getImagePath} from "../../../utils/utils";

const formatProduct = product => ({
	...product,
	images: product.images.map(getImagePath),
	price:  parseInt(product.price)
});

const mapStateToProps = (state, {params}) => {
	const {isFetching, item} = getProductById(state, params.id);

	return item
		? {isFetching, product: formatProduct(item)}
		: {isFetching: true, product: {}};
};

export default connect(mapStateToProps)(ProductDetails);