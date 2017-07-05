import React, {PropTypes} from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import PriceFilter from "../../filters/PriceFilter";
import CategoryFilter from "../../filters/categoryFilter/CategoryFilterContainer";
import DistanceFilter from "../../filters/distanceFilter/DistanceFilterContainer";

const SearchProduct = ({
	form,
	onSubmit,
	onNameChange,
	onCategoryChange,
	onPriceChange,
	onDistanceChange
}) => (
	<Form formName="searchProduct" onSubmit={onSubmit}>
		<TextFilter name={form.name} placeholder="What are you looking for?" onChange={onNameChange} required={true}/>
		<CategoryFilter exclusive={true} onChange={onCategoryChange} extraCategories={["All"]}/>
		<PriceFilter onChange={onPriceChange}/>
		<div className="location">

		</div>
		<DistanceFilter onChange={onDistanceChange}/>

		<div className="sort">

		</div>
	</Form>
);

SearchProduct.propTypes = {
	form:             PropTypes.object.isRequired,
	onSubmit:         PropTypes.func.isRequired,
	onNameChange:     PropTypes.func.isRequired,
	onCategoryChange: PropTypes.func.isRequired,
	onPriceChange:    PropTypes.func.isRequired,
	onDistanceChange: PropTypes.func.isRequired,
};

export default SearchProduct;
