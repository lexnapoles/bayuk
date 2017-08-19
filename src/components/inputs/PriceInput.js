import PropTypes from 'prop-types';
import React from 'react';
import { input } from './priceInput.css';
import Input from './labeledInput/LabeledInput';

const PriceInput = ({ id, description, onChange, value, range: { lowerLimit, upperLimit } }) => {
  const inputConf = {
    type: 'number',
    className: input,
    min: lowerLimit,
    max: upperLimit,
  };

  return (<Input
    id={id}
    description={description}
    onChange={onChange}
    inputConf={inputConf}
    value={value}
  />);
};

PriceInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  range: PropTypes.shape({
    lowerLimit: PropTypes.number,
    upperLimit: PropTypes.number,
  }),
};

PriceInput.defaultProps = {
  value: undefined,
  range: {
    lowerLimit: 0,
    upperLimit: 999,
  },
};

export default PriceInput;
