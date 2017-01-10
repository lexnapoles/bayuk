import React, {Component, createElement} from "react";
import FormWrapper from "./FormWrapper";
import {has} from "lodash/object";

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const defaultProps = {
	handlers: {}
};

const connectForm = (props = defaultProps) => WrappedComponent => {

	if (!has(props, "elements") && !has(props, "validation") && !has(props, "errorMessages")) {
		throw new Error("Elements, validation and errorMessages are required");
	}

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
