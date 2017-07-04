import React, {PropTypes} from "react";
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
	form:               PropTypes.object.isRequired,
	onSubmit:           PropTypes.func.isRequired,
	onNameChange:       PropTypes.func.isRequired,
	onCategoriesChange: PropTypes.func.isRequired,
	onPriceChange:      PropTypes.func.isRequired
};

export default SearchProduct;
