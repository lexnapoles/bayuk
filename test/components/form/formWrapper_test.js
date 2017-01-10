import React, {Component} from "react";
import {shallow} from "enzyme";
import FormWrapper from "../../../src/components/form/connectForm/FormWrapper";

const getEvent = value => ({
	target: {
		value
	}
});

const getFormComponent = (children = Component) => FormWrapper(children);

const getForm = (props, children) => {
	const Form          = getFormComponent(children),
				validation    = {},
				errorMessages = {},
				onSubmit      = () => void 0;

	const formProps = {validation, errorMessages, onSubmit, ...props};

	return shallow(<Form {...formProps}/>);
};

describe("<FormWrapper/>", function () {
	it("creates the form state using the elements array", function () {
		const wrapper = getForm({elements: ["name", "email"]});

		assert.deepEqual(wrapper.state("form"), {name: "", email: ""});
	});

	it("creates the error state using the elements array", function () {
		const wrapper = getForm({elements: ["name", "email"]});

		assert.deepEqual(wrapper.state("errors"), {name: "", email: ""});
	});

	it("creates the onChange handlers names with the syntax on[elementName]Change", function () {
		const elements = ["name", "email"];

		const handlers = getFormComponent().prototype.getHandlersNames(elements);

		assert.sameMembers(handlers, ["onNameChange", "onEmailChange"]);
	});

	it("reads the event's target value by default when an onChange event is raise", function () {
		const defaultHandler = getFormComponent().prototype.defaultHandler,
					value          = "George";

		const event = {
			target: {
				value
			}
		};

		assert.equal(defaultHandler(event), value);
	});

	it("assigns, by default, a default behaviour to the handlers in the state", function () {
		const wrapper        = getForm({elements: ["name"]}),
					defaultHandler = wrapper.state().handlers["onNameChange"],
					value          = "George";

		Reflect.apply(defaultHandler, wrapper, [getEvent(value)]);

		assert.equal(wrapper.state("form").name, value);
	});

	it("adds a custom handler instead of the default one if it is supplied", function () {
		const customMessage = " a custom handler",
					handlers      = {onEmailChange: () => customMessage},
					wrapper       = getForm({elements: ["email"], handlers}),
					onEmailChange = wrapper.state("handlers")["onEmailChange"];

		Reflect.apply(onEmailChange, wrapper, []);

		assert.equal(wrapper.state("form").email, customMessage);
	});

	it("makes the form state available to the custom handler", function () {
		const handlers = {
			onEmailChange: (data, state) => state.email
		};

		const wrapper       = getForm({elements: ["email"], handlers}),
					onEmailChange = wrapper.state("handlers")["onEmailChange"],
					email         = "email@email.com";

		wrapper.setState({
			form: {email}
		});

		Reflect.apply(onEmailChange, wrapper, []);

		assert.equal(wrapper.state("form").email, email);
	});

	it("passes the form state to the children", function () {
		const Children = () => <div></div>,
					wrapper  = getForm({elements: ["name", "email"]}, Children);

		assert.deepEqual(wrapper.find("Children").prop("form"), {name: "", email: ""})
	});

	it("passes the errors state to the children", function () {
		const Children = () => <div></div>,
					wrapper  = getForm({elements: ["name", "email"]}, Children);

		assert.deepEqual(wrapper.find("Children").prop("errors"), {name: "", email: ""})
	});

	it("passes the handlers to the children", function () {
		const Children = () => <div></div>,
					wrapper  = getForm({elements: ["name"]}, Children);

		assert.isFunction(wrapper.find("Children").prop("onNameChange"));
	});

	it("passes all the properties it doesn't need to children", function () {
		const Children = () => <div></div>,
					wrapper  = getForm({elements: ["name"], unnecessaryProp: "unnecessary"}, Children);

		assert.isDefined(wrapper.find("Children").prop("unnecessaryProp"));
	});

	it("doesn't pass own properties to children", function () {
		const Children = () => <div></div>,
					wrapper  = getForm({elements: ["name"], validation: {prop: "unnecessary"}}, Children);

		assert.isUndefined(wrapper.find("Children").prop("validation"));
	});

	it("creates the errors validating the form data with a validation and errorMessages object", function () {
		const createErrors  = getFormComponent().prototype.createErrors,
					formData      = {name: "Steven"},
					validation    = {name: value => value === "George"},
					errorMessages = {name: "Invalid name"};

		const errors = createErrors(formData, validation, errorMessages);

		assert.equal(errors.name, errorMessages.name);
	});

	it("only validates a field if there's a validator for it", function () {
		const createErrors  = getFormComponent().prototype.createErrors,
					formData      = {name: "Steven", email: "steven@steven.com"},
					validation    = {name: value => value === "George"},
					errorMessages = {name: "Invalid name"};

		const errors = createErrors(formData, validation, errorMessages);

		assert.deepEqual(errors, {name: "Invalid name", email: ""});
	});

	it("submits the form if it doesn't find an error message after validating", function () {
		const onSubmit      = sinon.spy(),
					validation    = {name: value => value === "George"},
					errorMessages = {name: "Invalid name"},
					wrapper       = getForm({elements: ["name"], validation, errorMessages, onSubmit}),
					onNameChange  = wrapper.state("handlers")["onNameChange"];

		Reflect.apply(onNameChange, wrapper, [getEvent("George")]);

		wrapper.instance().onSubmit(new Event("submit"));

		assert.isTrue(onSubmit.called);
	});
});


