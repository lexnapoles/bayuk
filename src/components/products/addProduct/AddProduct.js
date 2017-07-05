import PropTypes from 'prop-types';
import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import CategoryFilter from "../../filters/categoryFilter/CategoryFilterContainer";
import Filter from "../../filters/filter/Filter";
import ImagesFilter from "../../filters/ImagesFilter/ImagesFilterContainer";

const AddProduct = ({
	form,
	errors,
	maxImages,
	onSubmit,
	onNameChange,
	onImagesChange,
	onDescriptionChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="addForm" onSubmit={onSubmit}>
		<ImagesFilter error={errors.images} maxImages={maxImages} onChange={onImagesChange}/>
		<TextFilter name={form.name} error={errors.name} placeholder="Product name" onChange={onNameChange} required={true}/>
		<TextFilter name={form.description} error={errors.description} placeholder="Product description" onChange={onDescriptionChange}	required={true}/>
		<CategoryFilter error={errors.category} onChange={onCategoryChange}/>
		<Filter title="Price" error={errors.price}>
			<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
		</Filter>
	</Form>
);

AddProduct.propTypes = {
	form:                PropTypes.object.isRequired,
	errors:              PropTypes.object.isRequired,
	maxImages:           PropTypes.number.isRequired,
	onSubmit:         	 PropTypes.func.isRequired,
	onNameChange:        PropTypes.func.isRequired,
	onImagesChange:      PropTypes.func.isRequired,
	onDescriptionChange: PropTypes.func.isRequired,
	onCategoryChange:    PropTypes.func.isRequired,
	onPriceChange:       PropTypes.func.isRequired
};

export default AddProduct;