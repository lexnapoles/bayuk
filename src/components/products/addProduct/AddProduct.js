import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import CategoryFilter from "../../filters/CategoryFilter";
import Filter from "../../filters/filter/Filter";
import ImgInputContainer from "../../inputs/imgInput/ImgInputContainer";

const AddProduct = ({
	product,
	submitForm,
	onNameChange,
	onImageChange,
	onDescriptionChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="addForm" onSubmit={submitForm}>
		<ImgInputContainer images={product.images} onChange={onImageChange}/>
		<TextFilter name={product.name} placeholder="Product name" onChange={onNameChange}/>
		<TextFilter name={product.description} placeholder="Product description" onChange={onDescriptionChange}/>
		<CategoryFilter categories={product.categories} onChange={onCategoryChange}/>
		<Filter title="Price">
			<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
		</Filter>
	</Form>
);

AddProduct.propTypes = {
	product:             React.PropTypes.object.isRequired,
	submitForm:          React.PropTypes.func.isRequired,
	onNameChange:        React.PropTypes.func.isRequired,
	onImageChange:       React.PropTypes.func.isRequired,
	onDescriptionChange: React.PropTypes.func.isRequired,
	onCategoryChange:    React.PropTypes.func.isRequired,
	onPriceChange:       React.PropTypes.func.isRequired
};

export default AddProduct;