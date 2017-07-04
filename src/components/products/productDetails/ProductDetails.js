import React, {PropTypes, Component} from "react";
import CSSModules from "react-css-modules";
import Spinner from "../../spinner/Spinner";
import styles from "./productDetails.css";
import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "../../carousel/Carousel";
import Description from "./productDescription/ProductDescription";
import GeolocationInfo from "./geolocationInfo/GeolocationInfo";
import UserOverviewContainer from "./userOverview/UserOverviewContainer";
import NotFound from "../../notFound/NotFound";

class ProductDetails extends Component {
	constructor(props) {
		super(props);
	}

	renderProduct(product) {
		if (!product) {
			return <NotFound/>
		}

		const {price, name, description, images, owner} = product;

		return (
			<main styleName="productContainer">
				<Carousel styleName="carousel">
					{images}
				</Carousel>

				<section styleName="info">
					<Description
						styleName="infoSection"
						price={price}
						name={name}
						description={description}
					/>
					<hr styleName="line"/>
					<GeolocationInfo styleName="map"/>
					<hr styleName="line"/>
					<UserOverviewContainer styleName="infoSection" id={owner}/>
				</section>
			</main>
		);
	}

	renderSpinner() {
		return (
		<main styleName="productContainer">
			<Spinner/>
		</main>
		);
	}

	render() {
		const {isFetching, product} = this.props;

		return (
			<div styleName="container">
				<ProductDetailsHeader/>
				{isFetching ? this.renderSpinner() : this.renderProduct(product)}
			</div>
		);
	}
}

ProductDetails.propTypes = {
	product:    PropTypes.object,
	isFetching: PropTypes.bool,
	onClick:    PropTypes.func
};

ProductDetails.defaultProps = {
	isFetching: false
};

export default CSSModules(ProductDetails, styles);
