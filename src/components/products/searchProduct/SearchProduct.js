import PropTypes from 'prop-types';
import React from 'react';
import Form from '../../form/Form';
import TextFilter from '../../filters/textFilter/TextFilter';
import LocationFilter from '../../filters/locationFilter/LocationFilterContainer';
import PriceFilter from '../../filters/PriceFilter';
import CheckBoxFilterContainer from '../../filters/checkBoxFilter/CheckBoxFilterContainer';

const SearchProduct = ({
  form,
  errors,
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
      error={errors.name}
      placeholder="What are you looking for?"
      onChange={onNameChange}
    />

    <CheckBoxFilterContainer
      title="Categories"
      value={form.categories}
      error={errors.categories}
      onChange={onCategoriesChange}
    />

    <PriceFilter value={form.price} error={errors.price} onChange={onPriceChange} />

    <CheckBoxFilterContainer
      title="Distance"
      value={form.distance}
      error={errors.distance}
      onChange={onDistanceChange}
    />

    <LocationFilter onChange={onLocationChange} error={errors.location} />

    <CheckBoxFilterContainer
      title="Sort by"
      value={form.sort}
      error={errors.sort}
      onChange={onSortChange}
    />
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
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onCategoriesChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onDistanceChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SearchProduct;
