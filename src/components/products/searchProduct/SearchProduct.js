import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import PriceFilter from "../../filters/PriceFilter";
import CategoryFilter from "../../filters/categoryFilter/CategoryFilterContainer";

const SearchProduct = ({
	form,
	onSubmit,
	onNameChange,
	onCategoriesChange,
	onPriceChange
}) => (
	<Form formName="searchProduct" onSubmit={onSubmit}>
		<TextFilter name={form.name} placeholder="What are you looking for?" onChange={onNameChange} required={true}/>
		<CategoryFilter exclusive={false} onChange={onCategoriesChange}/>
		<PriceFilter onChange={onPriceChange}/>
	</Form>
);

SearchProduct.propTypes = {
	form:             React.PropTypes.object.isRequired,
	onSubmit:         React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoriesChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};

export default SearchProduct;
