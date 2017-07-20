import PropTypes from 'prop-types';
import React from "react";
import CSSModules from "react-css-modules";
import Spinner from "../../spinner/Spinner";
import styles from "./productDetails.css";
import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "../../carousel/Carousel";
import Description from "./productDescription/ProductDescription";
import GeolocationInfo from "./geolocationInfo/GeolocationInfo";
import UserOverviewContainer from "./userOverview/UserOverviewContainer";
import NotFound from "../../notFound/NotFound";


const renderSpinner = () => (
		<main styleName="productContainer">
			<Spinner/>
		</main>
	);

const renderProduct = product => {
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

const ProductDetails = ({product}) =>
	<div styleName="container">
		<ProductDetailsHeader/>
		{product ? renderProduct(product) : renderSpinner()}
	</div>;

ProductDetails.propTypes = {
	product:    PropTypes.object
};

export default CSSModules(ProductDetails, styles);
