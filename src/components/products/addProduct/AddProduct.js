import React from "react";
import Form from "../../form/Form";
import NameFilter from "../../filters/nameFilter/NameFilter";
import CategoryFilter from "../../filters/CategoryFilter";
import Filter from "../../filters/filter/Filter";

const AddProduct = ({
	name,
	categories,
	submitForm,
	onNameChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="addForm" onSubmit={submitForm}>
		<NameFilter name={name} placeholder="Product name" onChange={onNameChange}/>
		<CategoryFilter categories={categories} onChange={onCategoryChange}/>
		<Filter title="Price">
			<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
		</Filter>
	</Form>
);

AddProduct.propTypes = {
	name:             React.PropTypes.string.isRequired,
	categories:       React.PropTypes.object.isRequired,
	submitForm:       React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoryChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};

export default AddProduct;