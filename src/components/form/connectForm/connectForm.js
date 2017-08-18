import { Component, createElement } from 'react';
import { has } from 'lodash/object';
import { isEmpty } from 'lodash/lang';
import FormWrapper from './formWrapper';

const getDisplayName =
  WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const checkRequiredProps = (props) => {
  if (!has(props, 'elements')) {
    throw new Error('Elements variable is required');
  }
};

const checkEmptyProps = (props) => {
  if (isEmpty(props.elements)) {
    throw new Error('Elements variable cannot be empty');
  }
};

const checkValidatorsHaveErrorMessage = (props) => {
  if (!isEmpty(props.validation) && !isEmpty(props.errorMessages)) {
    const validators = Object.keys(props.validation);

    const validatorsHaveErrorMessage = validators.reduce(
      (hasMessage, validatorProp) =>
        hasMessage && Boolean(props.errorMessages[validatorProp]), true);

    if (!validatorsHaveErrorMessage) {
      throw new Error('A validator doesn\'t have its corresponding error message');
    }
  }
};

const checkInput = (props) => {
  checkRequiredProps(props);
  checkEmptyProps(props);
  checkValidatorsHaveErrorMessage(props);
};

const defaultProps = {
  handlers: {},
  validation: {},
  errorMessages: {},
  onSubmit: () => undefined,
};

const connectForm = (props = {}) => (WrappedComponent) => {
  checkInput(props);

  class ConnectForm extends Component {
    render() {
      const allProps = { ...defaultProps, ...props, ...this.props };
      const options = {
        displayName: `ConnectForm(${getDisplayName(WrappedComponent)})`,
      };

      return createElement(FormWrapper(WrappedComponent, options), allProps);
    }
  }

  return ConnectForm;
};

export default connectForm;
