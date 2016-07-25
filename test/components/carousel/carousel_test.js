import React from "react";
import {shallow} from "enzyme";
import Carousel from "../../../src/components/carousel/Carousel";

describe("<Carousel />", function () {
	it("shows a picture that was passed to it", function () {
		const picture = <img src="http://placekitten.com/200/300" alt="kitty"/>,
					carousel  = shallow(<Carousel>{picture}</Carousel>);

		assert.isTrue(carousel.contains(picture));
	});

	it("shows only one picture if several ones are passed", function () {
		const picture1 = <img key="1" src="http://placekitten.com/200/300" alt="kitty"/>,
					picture2 = <img key="2" src="http://placekitten.com/200/300" alt="kitty"/>,
					carousel = shallow(<Carousel children={[picture1, picture2]}/>);

		assert.isTrue(carousel.find("img").length === 1);
	});

	it("shows only the first picture if several ones are passed", function (){
		const picture1 = <img key="1" src="http://placekitten.com/200/300" alt="kitty"/>,
					picture2 = <img key="2" src="http://placekitten.com/200/300" alt="kitty"/>,
					carousel = shallow(<Carousel children={[picture1, picture2]}/>);

		assert.isTrue(carousel.contains(picture1));
	})

});




