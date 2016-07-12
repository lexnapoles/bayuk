import React, {Component} from "react";
import ProductDetailsHeader from "./productDetailsHeader/ProductDetailsHeader";

class ProductDetails extends Component {
	render() {
		return (
			<div>
				<ProductDetailsHeader/>
				<main>
					<section>
						<img src="http://placehold.it/500x500"/>
					</section>

					<section>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum sed ligula sed sollicitudin.
						Nullam fringilla diam eget lorem auctor hendrerit. Phasellus in nunc at nisi maximus volutpat.
						Vivamus pellentesque est eu enim tempor dignissim et nec arcu. Proin sed faucibus odio. Maecenas ac euismod
						nulla.
						In ut facilisis nunc. Donec tincidunt urna quis quam faucibus faucibus. Sed vel risus mattis, interdum arcu
						sed, auctor lorem.

						Nam a metus a diam ullamcorper sodales dictum et ligula. Aliquam ultrices viverra suscipit.
						Etiam nunc elit, luctus vitae lectus vulputate, feugiat feugiat felis. In non sem ornare, ornare purus ac,
						volutpat urna.
						Morbi vitae nibh tempor nisl aliquet porttitor. Proin commodo commodo nisi. Vestibulum mollis nunc at orci
						tempus dignissim.
						Duis a maximus tortor, eu condimentum ex. Vestibulum malesuada pulvinar ullamcorper.
						Suspendisse ac purus sit amet dui varius mattis at eu tortor.
					</section>

					<section>
						Geolocation
					</section>

					<section>
						User
					</section>
				</main>
			</div>
		);


	}
}

export default ProductDetails;
