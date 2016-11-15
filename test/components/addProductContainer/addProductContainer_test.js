import {component as AddProductContainer} from "../../../src/components/products/addProduct/AddProductContainer";
// import {NO_DATA_FILLED} from "../../../src/components/products/addProduct/errorConstants";
// import errorMsgs from "../../../src/components/products/addProduct/errorsMsgs";

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
		const product = generateProduct({
			name: ""
		});

		assert.isFalse(AddProductContainer.prototype.validate(product));
	});

	it("makes validation fail when description isn't filled", function () {
		const product = generateProduct({
			description: ""
		});

		assert.isFalse(AddProductContainer.prototype.validate(product));
	});

	it("makes validation fail when there is no selected category", function () {
		const product = generateProduct({
			categories: {"Music": false, "Videgames": false, "Movies": false, "Literature": false}
		});

		assert.isFalse(AddProductContainer.prototype.validate(product));
	});

	it("makes validation fail when price isn't filled", function () {
		const product = generateProduct({
			price: 0
		});

		assert.isFalse(AddProductContainer.prototype.validate(product));
	});

	it("makes validation fail when price is incorrect", function () {
		const product = generateProduct({
			price: -100
		});

		assert.isFalse(AddProductContainer.prototype.validate(product));
	});

	it("makes validation fail when there is no image", function () {
		const product = generateProduct({
			images: []
		});

		assert.isFalse(AddProductContainer.prototype.validate(product));
	});
});




