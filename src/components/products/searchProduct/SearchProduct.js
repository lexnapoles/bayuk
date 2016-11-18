import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import PriceFilter from "../../filters/PriceFilter";
import CategoryFilter from "../../filters/CategoryFilter";

const SearchProduct = ({
	name,
	categories,
	submitForm,
	onNameChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="searchProduct" onSubmit={submitForm}>
		<TextFilter name={name} placeholder="What are you looking for?" onChange={onNameChange} required={true}/>
		<CategoryFilter categories={categories} onChange={onCategoryChange}/>
		<PriceFilter onChange={onPriceChange}/>
	</Form>
);

SearchProduct.propTypes = {
	name:             React.PropTypes.string.isRequired,
	categories:       React.PropTypes.object.isRequired,
	submitForm:       React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoryChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};

export default SearchProduct;
