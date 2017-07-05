import React, {PropTypes} from "react";
import Filter from "../filter/Filter";
import Spinner from "../../spinner/Spinner";
import CheckBoxInput  from "../../inputs/CheckBoxInput";

const CategoryFilter = ({isFetching, onChange, categories, error}) => {
	const renderCategories = () => {
		const categoryNames = Object.keys(categories);

		return categoryNames.map(name =>
			<CheckBoxInput key={name}
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
	isFetching: PropTypes.bool,
	onChange:   PropTypes.func.isRequired,
	categories: PropTypes.object.isRequired,
	error:      PropTypes.string
};

CategoryFilter.defaultProps = {
	isFetching: false
};

export default CategoryFilter;

