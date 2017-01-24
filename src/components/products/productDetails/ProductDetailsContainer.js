import {connect} from "react-redux";
import ProductDetails from "./ProductDetails";
import {getProductById} from "../../../reducers/root";
import {getImagePath} from "../../../../utils/utils";

const formatProduct = product => ({
	...product,
	images: product.images.map(getImagePath.bind(void 0, "product")),
	price:  parseInt(product.price)
});

const mapStateToProps = (state, {params}) => {
	const {isFetching, item} = getProductById(state, params.id);

	return isFetching
		? {isFetching, product: {}}
		: {isFetching, product: item ? formatProduct(item) : void 0};
};

export default connect(mapStateToProps)(ProductDetails);