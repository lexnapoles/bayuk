import PropTypes from 'prop-types';
import React from 'react';
import Form from '../../form/Form';
import TextFilter from '../../filters/textFilter/TextFilter';
import LocationFilter from '../../filters/locationFilter/LocationFilterContainer';
import PriceFilter from '../../filters/PriceFilter';
import CheckBoxFilterContainer from '../../filters/checkBoxFilter/CheckBoxFilterContainer';

const SearchProduct = ({
  form,
  onSubmit,
  onNameChange,
  onCategoriesChange,
  onPriceChange,
  onDistanceChange,
  onLocationChange,
  onSortChange,
}) => (
  <Form formName="searchProduct" onSubmit={onSubmit} >
    <TextFilter
      name={form.name}
      placeholder="What are you looking for?"
      onChange={onNameChange}
      required
    />
    <CheckBoxFilterContainer
      title="Categories"
      value={form.categories}
      onChange={onCategoriesChange}
    />
    <PriceFilter value={form.price} onChange={onPriceChange} />
    <CheckBoxFilterContainer title="Distance" value={form.distance} onChange={onDistanceChange} />
    <LocationFilter onChange={onLocationChange} />
    <CheckBoxFilterContainer title="Sort by" value={form.sort} onChange={onSortChange} />
  </Form >
);

const formPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  distance: PropTypes.objectOf(PropTypes.bool).isRequired,
});

SearchProduct.propTypes = {
  form: formPropTypes.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onCategoriesChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onDistanceChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SearchProduct;
