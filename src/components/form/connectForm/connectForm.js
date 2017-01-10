import React, {Component, createElement} from "react";
import FormWrapper from "./FormWrapper";
import {has} from "lodash/object";
import {isEmpty} from "lodash/lang";

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const checkRequiredProps = props => {
	if (!has(props, "elements") && !has(props, "validation") && !has(props, "errorMessages")) {
		throw new Error("Elements, validation and errorMessages are required");
	}
};

const checkEmptyProps = props => {
	if (isEmpty(props.elements) || isEmpty(props.validation) || isEmpty(props.errorMessages)) {
		throw new Error("Elements, validation and errorMessages cannot be empty");
	}
};

const checkInput = props => {
	checkRequiredProps(props);
	checkEmptyProps(props)
};

export const defaultProps = {
	handlers: {}
};

const connectForm = (props = defaultProps) => WrappedComponent => {
	checkInput(props);

	class ConnectForm extends Component {
		render() {
			const allProps = {...props, ...this.props},
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
