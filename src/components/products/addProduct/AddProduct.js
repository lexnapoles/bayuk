import PropTypes from 'prop-types';
import React from 'react';
import Form from '../../form/Form';
import TextFilter from '../../filters/textFilter/TextFilter';
import CategoryFilter from '../../filters/categoryFilter/CategoryFilter';
import Filter from '../../filters/filter/Filter';
import ImagesFilter from '../../filters/imagesFilter/ImagesFilterContainer';

const AddProduct = ({
  form,
  errors,
  maxImages,
  onSubmit,
  onNameChange,
  onImagesChange,
  onDescriptionChange,
  onCategoryChange,
  onPriceChange,
}) => (
  <Form formName="addForm" onSubmit={onSubmit} >
    <ImagesFilter error={errors.images} maxImages={maxImages} onChange={onImagesChange} />

    <TextFilter
      name={form.name}
      error={errors.name}
      placeholder="Product name"
      onChange={onNameChange}
      required
    />

    <TextFilter
      name={form.description}
      error={errors.description}
      placeholder="Product description"
      onChange={onDescriptionChange}
      required
    />

    <CategoryFilter error={errors.category} onChange={onCategoryChange} />

    <Filter title="Price" error={errors.price} >
      <input type="number" min="0" placeholder="0" onChange={onPriceChange} />
    </Filter >
  </Form >
);

const formPropTypes = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.objectOf(PropTypes.string),
});

AddProduct.propTypes = {
  form: formPropTypes.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  maxImages: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onImagesChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
};

export default AddProduct;
