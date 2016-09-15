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
		const {price, name, description} = this.props;

		return (
			<div styleName="container">
				<ProductDetailsHeader/>
				<main styleName="productContainer">
					<Carousel styleName="carousel">
						{this.props.photos}
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
						<UserInfo styleName="infoSection"/>
					</section>
				</main>
			</div>
		);
	}
}

ProductDetails.propTypes = {
	name:        React.PropTypes.string.isRequired,
	photos:      React.PropTypes.array.isRequired,
	description: React.PropTypes.string.isRequired,
	price:       React.PropTypes.number.isRequired,
	onClick:     React.PropTypes.func
};


export default CSSModules(ProductDetails, styles);
