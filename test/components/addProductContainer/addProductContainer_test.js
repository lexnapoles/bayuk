import React from "react";
import {shallow} from "enzyme";
import {component as AddProductContainer} from "../../../src/components/products/addProduct/AddProductContainer";
import {
	NO_NAME_FILLED,
	NO_DESCRIPTION_FILLED,
	NO_CATEGORY_FILLED,
	NO_PRICE_FILLED,
	NO_IMAGES_FILLED
} from "../../../src/components/products/addProduct/errorConstants";
import errorMsgs from "../../../src/components/products/addProduct/errorsMsgs";

const generateProduct = (product = {}) => {
	const filledProduct = {
		name:        "Product",
		description: "A Product",
		categories:  {"Music": false, "Videogames": false, "Movies": false, "Literature": true},
		price:       5,
		images:      ["image"]
	};

	return Object.assign({}, filledProduct, product);
}

describe("<AddProductContainer/>", function () {
	describe("validation fails when one of the fields is not filled", function () {
		it("fails when name isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							name: ""
						});

			const validation = wrapper.instance().validate(product);

			assert.isFalse(validation);
		});

		it("fails when description isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							description: ""
						});

			const validation = wrapper.instance().validate(product);

			assert.isFalse(validation);
		});

		it("fails when there is no selected category", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							categories: {"Music": false, "Videogames": false, "Movies": false, "Literature": false}
						});

			const validation = wrapper.instance().validate(product);

			assert.isFalse(validation);
		});

		it("fails when price isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							price: 0
						});

			const validation = wrapper.instance().validate(product);

			assert.isFalse(validation);
		});

		it("fails when price is incorrect", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							price: -100
						});

			const validation = wrapper.instance().validate(product);

			assert.isFalse(validation);
		});

		it("fails when there is no image", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							images: []
						});

			const validation = wrapper.instance().validate(product);

			assert.isFalse(validation);
		});
	});

	describe("validation produces an error message when the fields aren't filled", function () {
		it("produces an error message when name isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							name: ""
						});

			wrapper.instance().validate(product)

			assert.equal(wrapper.state().errors.name, errorMsgs[NO_NAME_FILLED]);
		});

		it("produces an error message when description isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							description: ""
						});

			wrapper.instance().validate(product);

			assert.equal(wrapper.state().errors.description, errorMsgs[NO_DESCRIPTION_FILLED]);
		});

		it("produces an error message when price isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							price: ""
						});

			wrapper.instance().validate(product);

			assert.equal(wrapper.state().errors.price, errorMsgs[NO_PRICE_FILLED]);
		});

		it("produces an error message when category isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							categories: {"Music": false, "Videogames": false, "Movies": false, "Literature": false}
						});

			wrapper.instance().validate(product);

			assert.equal(wrapper.state().errors.categories, errorMsgs[NO_CATEGORY_FILLED]);
		});

		it("produces an error message when category isn't filled", function () {
			const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
						product = generateProduct({
							images: []
						});

			wrapper.instance().validate(product);

			assert.equal(wrapper.state().errors.images, errorMsgs[NO_IMAGES_FILLED]);
		});
	});

	it("submits the product when the form is valid", function () {
		const onSubmit = sinon.spy();
		const wrapper = shallow(<AddProductContainer onSubmit={onSubmit}/>);

		wrapper.setState({
			product: generateProduct()
		});

		wrapper.instance().submitForm(new Event("submit"));

		assert.isTrue(onSubmit.called);
	});
});




