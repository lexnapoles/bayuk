import PropTypes from "prop-types";
import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import Filter from "../../filters/filter/Filter";
import ImagesFilter from "../../filters/imagesFilter/ImagesFilterContainer";
import CheckBoxFilterContainer from "../../filters/checkBoxFilter/CheckBoxFilterContainer";

const AddProduct = ({
  form,
  errors,
  maxImages,
  onSubmit,
  onNameChange,
  onImagesChange,
  onDescriptionChange,
  onCategoriesChange,
  onPriceChange
}) => (
  <Form formName="addForm" onSubmit={onSubmit}>
    <ImagesFilter
      error={errors.images}
      maxImages={maxImages}
      onChange={onImagesChange}
    />

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

    <CheckBoxFilterContainer
      title="Categories"
      value={form.categories}
      error={errors.categories}
      onChange={onCategoriesChange}
    />

    <Filter title="Price" error={errors.price}>
      <input type="number" min="0" placeholder="0" onChange={onPriceChange} />
    </Filter>
  </Form>
);

const formPropTypes = PropTypes.shape({
  categories: PropTypes.objectOf(PropTypes.bool).isRequired
});

AddProduct.propTypes = {
  form: formPropTypes.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  maxImages: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onImagesChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCategoriesChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired
};

export default AddProduct;
