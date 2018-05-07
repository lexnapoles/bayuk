import PropTypes from "prop-types";
import { omit } from "lodash/object";
import { some } from "lodash/collection";
import { Component, createElement } from "react";
import { createDefaultObjectFrom } from "../../../utils";

const getChildrenProps = props => {
  const ownProps = [
    "elements",
    "onSubmit",
    "errorMessages",
    "validation",
    "handlers",
    "defaultFormState"
  ];

  return omit(props, ownProps);
};

const formWrapper = (WrappedComponent, options = {}) => {
  class FormContainer extends Component {
    static defaultHandler(event) {
      return event.target.value;
    }

    static getHandlersNames(elements) {
      return elements.map(name => {
        const upperCaseName = name.replace(/\b[a-z]/g, letter =>
          letter.toUpperCase()
        );

        return `on${upperCaseName}Change`;
      });
    }

    static errorsExist(errors) {
      return some(errors, error => error.length);
    }

    constructor(props) {
      super(props);

      const { elements } = props;
      const defaultElements = createDefaultObjectFrom(elements, "");
      const formState = { ...defaultElements, ...this.props.defaultFormState };

      this.state = {
        form: formState,
        errors: defaultElements,
        handlers: this.getHandlersObj(elements)
      };

      this.handlerWrapper = this.handlerWrapper.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.getValidator = this.getValidator.bind(this);
    }

    onSubmit(event) {
      event.preventDefault();

      const { form } = this.state;

      if (!this.validate(form)) {
        return;
      }

      this.props.onSubmit(form);
    }

    getHandlersObj(elements) {
      const names = FormContainer.getHandlersNames(elements);

      return names.reduce(
        (obj, handlerName, index) => ({
          ...obj,
          [handlerName]: this.getHandler(handlerName, elements[index])
        }),
        {}
      );
    }

    getHandler(handlerName, elementName) {
      const customHandler = this.props.handlers[handlerName];
      const handler = customHandler || FormContainer.defaultHandler;

      return data => this.handlerWrapper(elementName, handler, data);
    }

    getValidator(validation, prop) {
      return value =>
        validation[prop](value, this.state.form, getChildrenProps(this.props));
    }

    handlerWrapper(elemName, func, data) {
      const form = {
        ...this.state.form,
        [elemName]: func(data, this.state.form, getChildrenProps(this.props))
      };

      this.setState({ form });
    }

    createErrors(formData, validation, errMsg) {
      const elements = Object.keys(formData);

      return elements.reduce((obj, name) => {
        const value = formData[name];
        const isValid = validation[name]
          ? this.getValidator(validation, name)(value)
          : true;

        return {
          ...obj,
          [name]: isValid ? "" : errMsg[name]
        };
      }, {});
    }

    validate(form) {
      const { validation, errorMessages } = this.props;
      const errors = this.createErrors(form, validation, errorMessages);

      if (FormContainer.errorsExist(errors)) {
        this.setState({ errors });

        return false;
      }

      return true;
    }

    render() {
      const { form, errors, handlers } = this.state;

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
    elements: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    errorMessages: PropTypes.objectOf(PropTypes.string).isRequired,
    validation: PropTypes.objectOf(PropTypes.func).isRequired,
    handlers: PropTypes.objectOf(PropTypes.func),
    defaultFormState: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  FormContainer.defaultProps = {
    defaultFormState: {},
    handlers: {}
  };

  FormContainer.displayName = options.displayName;

  return FormContainer;
};

export default formWrapper;
