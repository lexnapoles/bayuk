import React, {Component, createElement} from "react";
import FormWrapper from "./FormWrapper";

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const defaultProps = {
	elements:      [],
	handlers:      {},
	validation:    {},
	errorMessages: {}
};

const connectForm = (props = defaultProps) => WrappedComponent => {
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

	ConnectForm.defaultProps = {
		handlers: {},
		onSubmit: () => void 0
	};

	return ConnectForm;
};

export default connectForm;
