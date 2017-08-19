import PropTypes from 'prop-types';
import React from 'react';
import Filter from './filter/Filter';
import PriceInput from '../inputs/PriceInput';

const PriceFilter = ({ value: { min, max }, onChange }) => (
  <Filter title="Price" >
    <PriceInput id="min" description="From" onChange={onChange} value={min} />
    <PriceInput id="max" description="To" onChange={onChange} value={max} />
  </Filter >
);

PriceFilter.propTypes = {
  value: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};

PriceFilter.defaultProps = {
  value: {},
};

export default PriceFilter;
