import React from "react";
import {shallow, mount} from "enzyme";
import {component as AddProductContainer} from "../../../src/components/products/addProduct/AddProductContainer";
import {NO_NAME_FILLED} from "../../../src/components/products/addProduct/errorConstants";
import errorMsgs from "../../../src/components/products/addProduct/errorsMsgs";

const generateProduct = (product = {}) => {
	const filledProduct = {
		name:        "Product",
		description: "A Product",
		categories:  {"Music": false, "Videgames": false, "Movies": false, "Literature": true},
		price:       5,
		images:      ["image"]
	};

	return Object.assign({}, filledProduct, product);
}

describe("<AddProductContainer/>", function () {
	it("makes validation fail when name isn't filled", function () {
		const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						name: ""
					});

		const validation = Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.isFalse(validation);
	});

	it("makes validation fail when description isn't filled", function () {
		const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						description: ""
					});

		const validation = Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.isFalse(validation);
	});

	it("makes validation fail when there is no selected category", function () {
		const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						categories: {"Music": false, "Videgames": false, "Movies": false, "Literature": false}
					});

		const validation = Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.isFalse(validation);
	});

	it("makes validation fail when price isn't filled", function () {
		const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						price: 0
					});

		const validation = Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.isFalse(validation);
	});

	it("makes validation fail when price is incorrect", function () {
		const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						price: -100
					});

		const validation = Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.isFalse(validation);
	});

	it("makes validation fail when there is no image", function () {
		const wrapper = shallow(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						images: []
					});

		const validation = Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.isFalse(validation);
	});

	it("produces an error message when name isn't filled", function () {
		const wrapper = mount(<AddProductContainer onSubmit={() => void 0}/>),
					product = generateProduct({
						name: ""
					});

		Reflect.apply(AddProductContainer.prototype.validate, wrapper.instance(), [product]);

		assert.equal(wrapper.state().errors.name, errorMsgs[NO_NAME_FILLED]);
	});
});




