import React, {Component} from "react";
import {shallow} from "enzyme";
import {pick} from "lodash/object";
import connectForm from "../../../src/components/form/connectForm/connectForm";

class SomeComponent extends Component {
	render() {
		return <div>A Component</div>;
	}
}

const getProps = wrapper => pick(wrapper.props(), ["elements", "handlers", "validation", "errorMessages"]);

const requiredProps = {
	elements:      ["first"],
	validation:    {first: () => void 0},
	errorMessages: {first: "First Error"}
};

const getForm = (props = requiredProps, children = SomeComponent) => {
	const Form = connectForm(props)(children);

	return shallow(<Form onSubmit={() => void 0}/>)
};

describe("connectForm", function () {
	it("returns a React.Component wrapping FormWrapper(WrappedComponent)", function () {
		const component = connectForm(requiredProps)(SomeComponent);

		assert.isTrue(Boolean(component.prototype.isReactComponent));
	});

	it("throws an exception if there are no elements, validation or errorMessages variables", function () {
		assert.throws(connectForm(), /Elements, validation and errorMessages are required/);
	});

	it("throws an exception if elements, validation or errorMessages variables are empty", function () {
		const props = {
			...requiredProps,
			elements: []
		};

		assert.throws(connectForm(props), /Elements, validation and errorMessages cannot be empty/);
	});

	it("uses a default handlers object if no custom one has been passed", function () {
		const requiredProps = {
			elements:      ["first"],
			validation:    {first: () => void 0},
			errorMessages: {first: "First Error"}
		};

		const Form    = connectForm(requiredProps)(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		assert.property(getProps(wrapper), "handlers");
	});

	it("uses a custom handler object if one has been passed", function () {
		const customMessage = "Custom name handler",
					customProps   = {
						...requiredProps,
						elements: ["name"],
						handlers: {onNameChange: () => customMessage}
					};

		const onNameChange = getForm(customProps).prop("handlers").onNameChange;

		assert.equal(onNameChange(), customMessage);
	});

	it("shows the displayName ConnectForm([WrappedComponent])", function () {
		assert.equal(getForm().name(), "ConnectForm(SomeComponent)");
	})
});


