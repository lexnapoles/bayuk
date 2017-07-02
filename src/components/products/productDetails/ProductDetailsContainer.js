import React, {Component}from "react";
import {connect} from "react-redux";
import ProductDetails from "./ProductDetails";
import {getProductById} from "../../../reducers/root";
import {getImagePath} from "../../../utils";
import {loadProduct} from "../../../actions/products";

const loadData = ({loadProduct, id}) => loadProduct(id);

class ProductDetailsContainer extends Component {
	componentWillMount() {
		loadData(this.props);
	}

	render() {
		return <ProductDetails {...this.props}/>
	}
}

ProductDetailsContainer.propTypes = {
	id:          React.PropTypes.string.isRequired,
	loadProduct: React.PropTypes.func.isRequired
};


const formatProduct = product => ({
	...product,
	images: product.images.map(getImagePath.bind(void 0, "product")),
	price:  parseInt(product.price)
});

const mapStateToProps = (state, {params: {id}}) => {
	const {isFetching, item} = getProductById(state, id);

	return isFetching
		? {isFetching, id, product: {}}
		: {isFetching, id, product: item ? formatProduct(item) : void 0};
};

export default connect(mapStateToProps, {
	loadProduct
})(ProductDetailsContainer);