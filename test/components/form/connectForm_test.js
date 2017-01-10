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
	elements: ["first"]
};

const getForm = (props = {}, children = SomeComponent) => {
	const formProps = {...requiredProps, ...props},
				Form      = connectForm(formProps)(children);

	return shallow(<Form onSubmit={() => void 0}/>)
};

describe("connectForm", function () {
	it("returns a React.Component wrapping FormWrapper(WrappedComponent)", function () {
		const component = connectForm(requiredProps)(SomeComponent);

		assert.isTrue(Boolean(component.prototype.isReactComponent));
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
	});

	describe("Error handling", function () {
		it("throws an exception if there is no elements variable", function () {
			assert.throws(connectForm(), /Elements variable is required/);
		});

		it("throws an exception if elements is empty", function () {
			const props = {
				elements: []
			};

			assert.throws(connectForm(props), /Elements variable cannot be empty/);
		});

		it("throws an exception if validators are included but the corresponding error messages are not", function () {
			const props = {
				...requiredProps,
				validation:    {
					name:  () => true,
					email: () => true
				},
				errorMessages: {
					name: "Error"
				}
			};

			assert.throws(connectForm(props), /A validator doesn't have its corresponding error message/);
		});
	});

});


