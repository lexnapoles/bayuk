import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./productDetails.css";

import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "nuka-carousel";
import Description from "./productDescription/ProductDescription";
import GeolocationInfo from "./geolocationInfo/GeolocationInfo";
import UserInfo from "./userInfo/UserInfo";

class ProductDetails extends Component {
	render() {
		return (
			<div styleName="container">
				<ProductDetailsHeader/>
				<main styleName="productContainer">
					<section styleName="carousel">
						<Carousel>
							<img src="http://placehold.it/200x200"/>
							<img src="http://placekitten.com/500/1000"/>
							<img src="http://placekitten.com/500/900"/>
							<img src="http://placehold.it/200x200"/>
						</Carousel>
					</section>

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
