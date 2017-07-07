import PropTypes from 'prop-types';
import React, {Component} from "react";
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

		const {price, name, description, images, owner, latitude, longitude} = product;

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
					<GeolocationInfo styleName="map" latitude={latitude} longitude={longitude}/>
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
		const {product} = this.props;

		return (
			<div styleName="container">
				<ProductDetailsHeader/>
				{product ? this.renderProduct(product) : this.renderSpinner()}
			</div>
		);
	}
}

ProductDetails.propTypes = {
	product:    PropTypes.object,
	onClick:    PropTypes.func
};

export default CSSModules(ProductDetails, styles);
