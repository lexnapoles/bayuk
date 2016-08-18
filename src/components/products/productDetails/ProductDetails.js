import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./productDetails.css";

import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "nuka-carousel";
import ProductDescription from "./productDescription/ProductDescription";
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
						<section styleName="geolocation">
							<img styleName="map"
								src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284"/>
						</section>
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
