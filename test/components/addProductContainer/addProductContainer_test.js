import {component} from "../../../src/components/products/addProduct/AddProductContainer";

const getDefaultProduct = () => ({
	name:        "",
	description: "",
	categories:  {"Music": false, "Videgames": false, "Movies": false, "Literature": false},
	price:       0,
	images:      []
});

describe("<AddProductContainer/>", function () {
	it("makes validation fail when the product isn't completely filled", function () {
		const product = getDefaultProduct();

		assert.isFalse(component.prototype.validate(product));
	});


});




