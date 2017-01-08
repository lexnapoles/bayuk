import React, {Component} from "react";
import {shallow} from "enzyme";
import {createDefaultObjectFrom} from "../../../src/utils/utils";
import {omit} from "lodash/object";
import {some} from "lodash/collection";

const FormWrapper = WrappedComponent => {
	const FormContainer = class FormContainer extends Component {
		constructor(props) {
			super(props);

			const elements    = props.elements,
						elementsObj = createDefaultObjectFrom(elements, "");

			this.state = ({
				form:     elementsObj,
				errors:   elementsObj,
				handlers: this.getHandlersObj(elements)
			});

			this.handlerWrapper = this.handlerWrapper.bind(this);
			this.submitForm = this.submitForm.bind(this);
		}

		defaultHandler(event) {
			return event.target.value;
		}

		handlerWrapper(elemName, func, data) {
			const form = {
				...this.state.form,
				[elemName]: func(data)
			};

			this.setState({form});
		}

		getHandlersNames(elements) {
			return elements.map(name => {
				const upperCaseName = name.replace(/\b[a-z]/g, letter => letter.toUpperCase());

				return `on${upperCaseName}Change`;
			});
		}

		getHandler(handlerName, elementName) {
			const customHandler = this.props.handlers[handlerName],
						handler       = customHandler	? customHandler	: this.defaultHandler;

			return data => this.handlerWrapper(elementName, handler, data);
		}

		getHandlersObj(elements) {
			const names = this.getHandlersNames(elements);

			return names.reduce((obj, handlerName, index) => ({
				...obj,
				[handlerName]: this.getHandler(handlerName, elements[index])
			}), {});
		}

		createErrors(formData, validation, errMsg) {
			const elements = Object.keys(formData);

			const errors = elements.reduce((obj, name) => {
				const value   = formData[name],
							isValid = validation[name];

				return {
					...obj,
					[name]: isValid(value) ? "" : errMsg[name]
				};
			}, {});

			return errors;
		}

		errorsExist(errors) {
			return some(errors, error => error.length);
		}

		validate(form) {
			const {validation, errorMessages} = this.props,
						errors                      = this.createErrors(form, validation, errorMessages);

			if (this.errorsExist(errors)) {
				this.setState({errors});

				return false;
			}

			return true;
		}

		submitForm(event) {
			event.preventDefault();

			const {form} = this.state;

			if (!this.validate(form)) {
				return;
			}

			this.props.onSubmit(form);
		}

		render() {
			const ownProps                 = ["elements", "onSubmit", "errorMessages", "validation", "handlers"],
						props                    = omit(this.props, ownProps),
						{form, errors, handlers} = this.state;

			return <WrappedComponent form={form} errors={errors} onSubmit={this.submitForm}{...handlers} {...props} />;
		}
	};

	FormContainer.propTypes = {
		elements:      React.PropTypes.array.isRequired,
		onSubmit: 		 React.PropTypes.func.isRequired,
		errorMessages: React.PropTypes.object.isRequired,
		validation:    React.PropTypes.object.isRequired,
		handlers:      React.PropTypes.object
	};

	FormContainer.defaultProps = {
		handlers:      {}
	};

	return FormContainer;
};

const getEvent = value => ({
	target: {
		value
	}
});

const getFormComponent = (children = React.Component) => FormWrapper(children);

const renderForm = (props, children) => {
	const Form          = getFormComponent(children),
				validation    = {},
				errorMessages = {},
				onSubmit      = () => void 0;

	const formProps = {validation, errorMessages, onSubmit, ...props};

	return shallow(<Form {...formProps}/>);
};


describe("<FormWrapper/>", function () {
	it("creates the form state using the elements array", function () {
		const wrapper = renderForm({elements: ["name", "email"]});

		assert.deepEqual(wrapper.state("form"), {name: "", email: ""});
	});

	it("creates the error state using the elements array", function () {
		const wrapper = renderForm({elements: ["name", "email"]});

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
		const wrapper        = renderForm({elements: ["name"]}),
					defaultHandler = wrapper.state().handlers["onNameChange"],
					value          = "George";

		Reflect.apply(defaultHandler, wrapper, [getEvent(value)]);

		assert.equal(wrapper.state("form").name, value);
	});

	it("adds a custom handler instead of the default if it finds one", function () {
		const customMessage = " a custom handler",
					handlers      = {onEmailChange: () => customMessage},
					wrapper       = renderForm({elements: ["email"], handlers}),
					onEmailChange = wrapper.state("handlers")["onEmailChange"];

		Reflect.apply(onEmailChange, wrapper, []);

		assert.equal(wrapper.state("form").email, customMessage);
	});

	it("passes the form state to the children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name", "email"]}, Children);

		assert.deepEqual(wrapper.find("Children").prop("form"), {name: "", email: ""})
	});

	it("passes the errors state to the children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name", "email"]}, Children);

		assert.deepEqual(wrapper.find("Children").prop("errors"), {name: "", email: ""})
	});

	it("passes the handlers to the children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name"]}, Children);

		assert.isFunction(wrapper.find("Children").prop("onNameChange"));
	});

	it("passes all the properties it doesn't need to children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name"], unnecessaryProp: "unnecessary"}, Children);

		assert.isDefined(wrapper.find("Children").prop("unnecessaryProp"));
	});

	it("doesn't pass own properties to children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name"], validation: {prop: "unnecessary"}}, Children);

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

	it("submits the form if it doesn't find an error message after validating", function () {
		const onSubmit      = sinon.spy(),
					validation    = {name: value => value === "George"},
					errorMessages = {name: "Invalid name"},
					wrapper       = renderForm({elements: ["name"], validation, errorMessages, onSubmit}),
					onNameChange  = wrapper.state("handlers")["onNameChange"];

		Reflect.apply(onNameChange, wrapper, [getEvent("George")]);

		wrapper.instance().submitForm(new Event("submit"));

		assert.isTrue(onSubmit.called);
	});
});


