import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./productDetails.css";

import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "nuka-carousel";
import ProductDescription from "./productDescription/ProductDescription";
import Geolocation from "./geolocation/Geolocation";
import Icon from "react-fa";

class ProductDetails extends Component {
	render() {
		return (
			<div>
				<ProductDetailsHeader/>
				<main styleName="productDetails">
					<section styleName="carousel">
						<Carousel>
							<img src="http://placehold.it/200x200"/>
							<img src="http://placekitten.com/500/500"/>
							<img src="http://placehold.it/200x200"/>
						</Carousel>
					</section>

					<div styleName="productInfo">
						<ProductDescription />
						<Geolocation/>

						<section styleName="user">
							<img styleName="userImage" width="100" height="100"
								src="http://www.publicdomainpictures.net/pictures/20000/velka/women-face.jpg" alt="userPic"/>
							<p>John McStar</p>
							<div styleName="rating">
								<Icon name="star" size="lg"/>
								<Icon name="star" size="lg"/>
								<Icon name="star" size="lg"/>
								<Icon name="star-half-empty" size="lg"/>
								<Icon name="star-o" size="lg"/>
							</div>
						</section>
					</div>
				</main>
			</div>
		);
	}
}

export default CSSModules(ProductDetails, styles);
