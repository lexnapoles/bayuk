import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import CategoryFilter from "../../filters/CategoryFilter";
import Filter from "../../filters/filter/Filter";
import ImagesFilter from "../../filters/ImagesFilter/ImagesFilterContainer";

const AddProduct = ({
	product,
	maxImages,
	submitForm,
	onNameChange,
	onImagesChange,
	onDescriptionChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="addForm" onSubmit={submitForm}>
		<ImagesFilter maxImages={maxImages} onChange={onImagesChange}/>
		<TextFilter name={product.name} placeholder="Product name" onChange={onNameChange} required={true}/>
		<TextFilter name={product.description} placeholder="Product description" onChange={onDescriptionChange} required={true}/>
		<CategoryFilter categories={product.categories} onChange={onCategoryChange}/>
		<Filter title="Price">
			<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
		</Filter>
	</Form>
);

AddProduct.propTypes = {
	product:             React.PropTypes.object.isRequired,
	maxImages:           React.PropTypes.number.isRequired,
	submitForm:          React.PropTypes.func.isRequired,
	onNameChange:        React.PropTypes.func.isRequired,
	onImagesChange:      React.PropTypes.func.isRequired,
	onDescriptionChange: React.PropTypes.func.isRequired,
	onCategoryChange:    React.PropTypes.func.isRequired,
	onPriceChange:       React.PropTypes.func.isRequired
};

export default AddProduct;