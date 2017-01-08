import React, {Component} from "react";
import {shallow} from "enzyme";
import {createDefaultObjectFrom} from "../../../src/utils/utils";

class FormContainer extends Component {
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
		const handler = this.props.handlers[handlerName]
			? this.props.handlers[handlerName]
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
		return (
			<div></div>
		);
	}
}

FormContainer.propTypes = {
	elements: React.PropTypes.array.isRequired,
	handlers: React.PropTypes.object
};

FormContainer.defaultProps = {
	handlers: {}
};


describe("<FormContainer/>", function () {
	it("creates the form state using the elements array", function () {
		const wrapper = shallow(<FormContainer elements={["name", "email"]}/>);

		assert.deepEqual(wrapper.state("form"), {name: "", email: ""});
	});

	it("creates the error state using the elements array", function () {
		const wrapper = shallow(<FormContainer elements={["name", "email"]}/>);

		assert.deepEqual(wrapper.state("errors"), {name: "", email: ""});
	});

	it("creates the onChange handlers names with the syntax on[elementName]Change", function () {
		const elements = ["name", "email"];

		const handlers = FormContainer.prototype.getHandlersNames(elements);

		assert.sameMembers(handlers, ["onNameChange", "onEmailChange"]);
	});

	it("reads the event's target value by default when an onChange event is raise", function () {
		const defaultHandler = FormContainer.prototype.defaultHandler,
					value          = "George";

		const event = {
			target: {
				value
			}
		};

		assert.equal(defaultHandler(event), value);
	});

	it("assigns, by default, the default behaviour to the handlers in the state", function () {
		const wrapper        = shallow(<FormContainer elements={["name"]}/>),
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
					wrapper       = shallow(<FormContainer elements={["email"]} handlers={handlers}/>),
					onEmailChange = wrapper.state().handlers["onEmailChange"];

		Reflect.apply(onEmailChange, wrapper, []);

		assert.equal(wrapper.state().form.email, customMessage);
	});
});


