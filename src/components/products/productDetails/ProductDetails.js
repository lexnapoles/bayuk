import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./productDetails.css";

import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";
import Carousel from "nuka-carousel";
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
						<section styleName="description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum sed ligula sed sollicitudin.
							Nullam fringilla diam eget lorem auctor hendrerit. Phasellus in nunc at nisi maximus volutpat.
							Vivamus pellentesque est eu enim tempor dignissim et nec arcu. Proin sed faucibus odio. Maecenas ac
							euismod
							nulla.
							In ut facilisis nunc. Donec tincidunt urna quis quam faucibus faucibus. Sed vel risus mattis, interdum
							arcu
							sed, auctor lorem.

							Nam a metus a diam ullamcorper sodales dictum et ligula. Aliquam ultrices viverra suscipit.
							Etiam nunc elit, luctus vitae lectus vulputate, feugiat feugiat felis. In non sem ornare, ornare purus ac,
							volutpat urna.
							Morbi vitae nibh tempor nisl aliquet porttitor. Proin commodo commodo nisi. Vestibulum mollis nunc at orci
							tempus dignissim.
							Duis a maximus tortor, eu condimentum ex. Vestibulum malesuada pulvinar ullamcorper.
							Suspendisse ac purus sit amet dui varius mattis at eu tortor.
						</section>
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
