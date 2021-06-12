/* eslint-disable react/forbid-prop-types */

import PropTypes from "prop-types";
import React from "react";
import TextInput from "../../inputs/textInput/TextInput";
import {
  authContainer,
  auth,
  formContainer,
  title,
  inputsContainer,
  inputs,
  submitButton
} from "./authForm.css";

const AuthForm = ({
  form,
  formName,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  errors,
  logIn
}) => (
  <div className={authContainer}>
    <div className={auth}>
      <form className={formContainer} onSubmit={onSubmit}>
        <h1 className={title}>{formName}</h1>
        <div className={inputsContainer}>
          {logIn ? (
            undefined
          ) : (
            <TextInput
              value={form.name}
              placeholder="Name"
              onChange={onNameChange}
              className={inputs}
              error={errors.name}
            />
          )}

          <TextInput
            value={form.email}
            placeholder="Email"
            onChange={onEmailChange}
            className={inputs}
            error={errors.email}
          />

          <TextInput
            value={form.password}
            placeholder="Password"
            onChange={onPasswordChange}
            className={inputs}
            error={errors.password}
          />
        </div>
        <button type="submit" className={submitButton}>
          {formName}
        </button>
      </form>
    </div>
  </div>
);

AuthForm.propTypes = {
  formName: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onNameChange: PropTypes.func,
  logIn: PropTypes.bool
};

AuthForm.defaultProps = {
  logIn: false,
  onNameChange: () => undefined
};

export default AuthForm;
