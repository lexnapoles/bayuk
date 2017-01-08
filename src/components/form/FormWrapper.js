import React, {Component} from "react";
import {createDefaultObjectFrom} from "../../utils/utils";
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
				[elemName]: func(data, this.state.form)
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

export default FormWrapper;