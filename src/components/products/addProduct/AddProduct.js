import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import CategoryFilter from "../../filters/CategoryFilter";
import Filter from "../../filters/filter/Filter";
import ImagesFilter from "../../filters/ImagesFilter/ImagesFilterContainer";

const AddProduct = ({
	product,
	errors,
	maxImages,
	submitForm,
	onNameChange,
	onImagesChange,
	onDescriptionChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="addForm" onSubmit={submitForm}>
		<ImagesFilter error={errors.images} maxImages={maxImages} onChange={onImagesChange}/>
		<TextFilter name={product.name} error={errors.name} placeholder="Product name" onChange={onNameChange} required={true}/>
		<TextFilter name={product.description} error={errors.description} placeholder="Product description" onChange={onDescriptionChange}	required={true}/>
		<CategoryFilter categories={product.categories} error={errors.categories} onChange={onCategoryChange}/>
		<Filter title="Price" error={errors.price}>
			<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
		</Filter>
	</Form>
);

AddProduct.propTypes = {
	product:             React.PropTypes.object.isRequired,
	errors:              React.PropTypes.object.isRequired,
	maxImages:           React.PropTypes.number.isRequired,
	submitForm:          React.PropTypes.func.isRequired,
	onNameChange:        React.PropTypes.func.isRequired,
	onImagesChange:      React.PropTypes.func.isRequired,
	onDescriptionChange: React.PropTypes.func.isRequired,
	onCategoryChange:    React.PropTypes.func.isRequired,
	onPriceChange:       React.PropTypes.func.isRequired
};

export default AddProduct;