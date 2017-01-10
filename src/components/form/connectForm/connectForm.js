import React, {Component, createElement} from "react";
		import FormWrapper from "./FormWrapper";
		import {has} from "lodash/object";
		import {isEmpty} from "lodash/lang";

		const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

		const checkRequiredProps = props => {
			if (!has(props, "elements")) {
				throw new Error("Elements variable is required");
			}
		};

		const checkEmptyProps = props => {
			if (isEmpty(props.elements)) {
				throw new Error("Elements variable cannot be empty");
			}
		};

const checkValidatorsHaveErrorMessage = (props) => {
	if (!isEmpty(props.validation) && !isEmpty(props.errorMessages)) {
		const validators = Object.keys(props.validation);

		const validatorsHaveErrorMessage = validators.reduce((hasMessage, validatorProp) => hasMessage && Boolean(props.errorMessages[validatorProp]), true);

		if (!validatorsHaveErrorMessage) {
			throw new Error("A validator doesn't have its corresponding error message");
		}
	}
};

const checkInput = props => {
	checkRequiredProps(props);
	checkEmptyProps(props);
	checkValidatorsHaveErrorMessage(props);
};

const defaultProps = {
	handlers:      {},
	validation:    {},
	errorMessages: {}
};

const connectForm = (props = {}) => WrappedComponent => {
	checkInput(props);

	class ConnectForm extends Component {
		render() {
			const allProps = {...defaultProps, ...props, ...this.props},
						options  = {
							displayName: `ConnectForm(${getDisplayName(WrappedComponent)})`
						};

			return createElement(FormWrapper(WrappedComponent, options), allProps);
		}
	}

	ConnectForm.propTypes = {
		onSubmit: React.PropTypes.func,
		handlers: React.PropTypes.object
	};

	return ConnectForm;
};

export default connectForm;
