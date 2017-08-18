import PropTypes from 'prop-types';
import React from 'react';
import { input, invalidInput, errorText, underline } from './textInput.css';

const TextInput = ({ value, placeholder, onChange, className, error }) =>
  (<div className={className} >
    <input
      className={error.length ? invalidInput : input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    <hr className={underline} />
    {error.length ? <p className={errorText} >{error}</p > : undefined}
  </div >);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: '',
  placeholder: '',
  className: '',
};

export default TextInput;
