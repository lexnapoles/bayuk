import React from "react";
import {shallow} from "enzyme";
import Carousel from "../../../src/components/carousel/Carousel";

describe("<Carousel />", function () {
	it("shows a picture that was passed to it", function () {
		const picture = <img src="http://placekitten.com/200/300 alt='kitty'"/>,
					carousel  = shallow(<Carousel>{picture}</Carousel>);

		assert.isTrue(carousel.contains(picture));
	});

});




