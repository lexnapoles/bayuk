import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import PriceFilter from "../../filters/PriceFilter";
import CategoryFilter from "../../filters/categoryFilter/CategoryFilterContainer";

const SearchProduct = ({
	name,
	onSubmit,
	onNameChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="searchProduct" onSubmit={onSubmit}>
		<TextFilter name={name} placeholder="What are you looking for?" onChange={onNameChange} required={true}/>
		<CategoryFilter exclusive={false} onChange={onCategoryChange}/>
		<PriceFilter onChange={onPriceChange}/>
	</Form>
);

SearchProduct.propTypes = {
	name:             React.PropTypes.string.isRequired,
	onSubmit:         React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoryChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};

export default SearchProduct;
