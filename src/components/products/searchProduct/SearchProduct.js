import PropTypes from 'prop-types';
import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import LocationFilter from "../../filters/locationFilter/LocationFilterContainer";
import PriceFilter from "../../filters/PriceFilter";
import CategoryFilter from "../../filters/categoryFilter/CategoryFilter";
import DistanceFilter from "../../filters/distanceFilter/DistanceFilter";
import SortFilter from "../../filters/sortFilter/SortFilter";

const SearchProduct = ({
	form,
	onSubmit,
	onNameChange,
	onCategoryChange,
	onPriceChange,
	onDistanceChange,
	onLocationChange,
	onSortChange
}) => (
	<Form formName="searchProduct" onSubmit={onSubmit}>
		<TextFilter name={form.name} placeholder="What are you looking for?" onChange={onNameChange} required={true}/>
		<CategoryFilter onChange={onCategoryChange}/>
		<PriceFilter onChange={onPriceChange}/>
		<DistanceFilter onChange={onDistanceChange}/>
		<LocationFilter onChange={onLocationChange}/>
		<SortFilter onChange={onSortChange}/>
	</Form>
);

SearchProduct.propTypes = {
	form:             PropTypes.object.isRequired,
	onSubmit:         PropTypes.func.isRequired,
	onNameChange:     PropTypes.func.isRequired,
	onCategoryChange: PropTypes.func.isRequired,
	onPriceChange:    PropTypes.func.isRequired,
	onDistanceChange: PropTypes.func.isRequired,
	onLocationChange: PropTypes.func.isRequired,
	onSortChange:     PropTypes.func.isRequired,
};

export default SearchProduct;