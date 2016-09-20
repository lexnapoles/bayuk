import React from "react";
import Form from "../form/Form";
import NameFilter from "../filters/nameFilter/NameFilter";
import PriceFilter from "../filters/PriceFilter";
import CategoryFilter from "../filters/CategoryFilter";

const SearchForm = ({
	name,
	categories,
	submitForm,
	onNameChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="searchForm" onSubmit={submitForm}>
		<NameFilter name={name} placeholder="What are you looking for?" onChange={onNameChange}/>
		<CategoryFilter categories={categories} onChange={onCategoryChange}/>
		<PriceFilter onChange={onPriceChange}/>
	</Form>
);

SearchForm.propTypes = {
	name:             React.PropTypes.string.isRequired,
	categories:       React.PropTypes.object.isRequired,
	submitForm:       React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoryChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};

export default SearchForm;
