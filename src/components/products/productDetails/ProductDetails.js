import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./productDetails.css";

import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "../../carousel/Carousel";
import Description from "./productDescription/ProductDescription";
import GeolocationInfo from "./geolocationInfo/GeolocationInfo";
import UserInfo from "./userInfo/UserInfo";

class ProductDetails extends Component {
	render() {
		return (
			<div styleName="container">
				<ProductDetailsHeader/>
				<main styleName="productContainer">
						<Carousel styleName="carousel">
							<img src="http://placehold.it/200x200?text=slide1"/>
							<img src="http://placehold.it/200x200?text=slide2"/>
							<img src="http://placehold.it/200x200?text=slide3"/>
						</Carousel>

					<section styleName="info">
						<Description styleName="infoSection"/>
						<hr styleName="line"/>
						<GeolocationInfo styleName="map"/>
						<hr styleName="line"/>
						<UserInfo styleName="infoSection"/>
					</section>
				</main>
			</div>
		);
	}
}

export default CSSModules(ProductDetails, styles);
