import PropTypes from 'prop-types';
import { Component, createElement } from "react";
import {createDefaultObjectFrom} from "../../../utils";
import {omit} from "lodash/object";
import {some} from "lodash/collection";

const getChildrenProps = props => {
	const ownProps = ["elements", "onSubmit", "errorMessages", "validation", "handlers", "defaultFormState"];

	return omit(props, ownProps);
};

const formWrapper = (WrappedComponent, options = {}) => {
	class FormContainer extends Component {
		constructor(props) {
			super(props);

			const elements        = props.elements,
						defaultElements = createDefaultObjectFrom(elements, ""),
						formState       = {...defaultElements, ...this.props.defaultFormState};

			this.state = ({
				form:     formState,
				errors:   defaultElements,
				handlers: this.getHandlersObj(elements)
			});

			this.handlerWrapper = this.handlerWrapper.bind(this);
			this.onSubmit = this.onSubmit.bind(this);
			this.getValidator = this.getValidator.bind(this);
		}

		defaultHandler(event) {
			return event.target.value;
		}

		handlerWrapper(elemName, func, data) {
			const form = {
				...this.state.form,
				[elemName]: func(data, this.state.form, getChildrenProps(this.props))
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
						handler       = customHandler ? customHandler : this.defaultHandler;

			return data => this.handlerWrapper(elementName, handler, data);
		}

		getHandlersObj(elements) {
			const names = this.getHandlersNames(elements);

			return names.reduce((obj, handlerName, index) => ({
				...obj,
				[handlerName]: this.getHandler(handlerName, elements[index])
			}), {});
		}

		getValidator(validation, prop) {
			return value => validation[prop](value, this.state.form, getChildrenProps(this.props));
		}

		createErrors(formData, validation, errMsg) {
			const elements = Object.keys(formData);

			const errors = elements.reduce((obj, name) => {
				const value   = formData[name],
							isValid = validation[name] ? this.getValidator(validation, name)(value) : true;

				return {
					...obj,
					[name]: isValid ? "" : errMsg[name]
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

		onSubmit(event) {
			event.preventDefault();

			const {form} = this.state;

			if (!this.validate(form)) {
				return;
			}

			this.props.onSubmit(form);
		}

		render() {
			const {form, errors, handlers} = this.state;

			const props = {
				form,
				errors,
				onSubmit: this.onSubmit,
				...handlers,
				...getChildrenProps(this.props)
			};

			return createElement(WrappedComponent, props);
		}
	}

	FormContainer.propTypes = {
		elements:         PropTypes.array.isRequired,
		onSubmit:         PropTypes.func.isRequired,
		errorMessages:    PropTypes.object.isRequired,
		validation:       PropTypes.object.isRequired,
		defaultFormState: PropTypes.object,
		handlers:         PropTypes.object
	};

	FormContainer.defaultProps = {
		handlers: {}
	};

	FormContainer.displayName = options.displayName;

	return FormContainer;
};

export default formWrapper;