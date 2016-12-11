import React from "react";
import Filter from "../filter/Filter";
import CategoryInput  from "../../inputs/CategoryInput";

const CategoryFilter = ({onChange, categories, error}) => {
	const renderCategories = () => {
		const categoryNames = Object.keys(categories);

		return categoryNames.map(name =>
			<CategoryInput key={name}
											id={name}
											description={name}
											checked={categories[name]}
											onChange={onChange}/>
		);
	};

	return (
		<Filter title="Category" error={error}>
			{renderCategories()}
		</Filter>
	);
};

CategoryFilter.propTypes = {
	onChange:   React.PropTypes.func.isRequired,
	categories: React.PropTypes.object.isRequired,
	error:      React.PropTypes.string
};

export default CategoryFilter;

