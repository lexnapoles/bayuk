import React, {Component} from "react";
import {shallow} from "enzyme";
import {createDefaultObjectFrom} from "../../../src/utils/utils";
import {omit} from "lodash/object";

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
						handler       = customHandler
							? customHandler
							: this.defaultHandler;

			return data => this.handlerWrapper(elementName, handler, data);
		}

		getHandlersObj(elements) {
			const names = this.getHandlersNames(elements);

			return names.reduce((obj, handlerName, index) => ({
				...obj,
				[handlerName]: this.getHandler(handlerName, elements[index])
			}), {});
		}

		render() {
			const {form, errors, handlers} = this.state,
						props                    = omit(this.props, ["elements", "handlers"]);

			return <WrappedComponent form={form} errors={errors} {...handlers} {...props}/>;
		}
	};

	FormContainer.propTypes = {
		elements: React.PropTypes.array.isRequired,
		handlers: React.PropTypes.object
	};

	FormContainer.defaultProps = {
		handlers: {}
	};

	return FormContainer;
};

const getFormComponent = (children = React.Component) => FormWrapper(children);

const renderForm = (props, children) => {
	const Form = getFormComponent(children);

	return shallow(<Form {...props}/>);
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

	it("assigns, by default, the default behaviour to the handlers in the state", function () {
		const wrapper        = renderForm({elements: ["name"]}),
					defaultHandler = wrapper.state().handlers["onNameChange"],
					value          = "George";

		const event = {
			target: {
				value
			}
		};

		Reflect.apply(defaultHandler, wrapper, [event]);

		assert.equal(wrapper.state().form.name, value);
	});

	it("adds a custom handler instead of the default if it finds one", function () {
		const customMessage = " a custom handler",
					handlers      = {onEmailChange: () => customMessage},
					wrapper       = renderForm({elements: ["email"], handlers}),
					onEmailChange = wrapper.state().handlers["onEmailChange"];

		Reflect.apply(onEmailChange, wrapper, []);

		assert.equal(wrapper.state().form.email, customMessage);
	});

	it("passes the form state to the children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name", "email"]}, Children);

		assert.deepEqual(wrapper.find("Children").prop("form"), {name: "", email: ""})
	});

	it("passes the errors state to the children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name"]}, Children);

		assert.deepEqual(wrapper.find("Children").prop("errors"), {name: "", email: ""})
	});

	it("passes the handlers to the children", function () {
		const Children = () => <div></div>,
					wrapper  = renderForm({elements: ["name"]}, Children);

		assert.isFunction(wrapper.find("Children").prop("onNameChange"));
	});
});


