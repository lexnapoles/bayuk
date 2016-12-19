import React from "react";
import Filter from "../filter/Filter";
import Spinner from "../../spinner/Spinner";
import CategoryInput  from "../../inputs/CategoryInput";

const CategoryFilter = ({isFetching, onChange, categories, error}) => {
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
			{isFetching ? <Spinner/> : renderCategories()}
		</Filter>
	);
};

CategoryFilter.propTypes = {
	isFetching: React.PropTypes.bool,
	onChange:   React.PropTypes.func.isRequired,
	categories: React.PropTypes.object.isRequired,
	error:      React.PropTypes.string
};

CategoryFilter.defaultProps = {
	isFetching: false
};

export default CategoryFilter;

