import React, {Component} from "react";
import Filter from "./Filter";
import CategoryInput  from "../../inputs/CategoryInput";

class CategoryFilter extends Component {
	renderCategories() {
		const categories = Object.keys(this.props.categories);

		return categories.map((name) =>
			<CategoryInput 	key={name}
											id={name}
											description={name}
											checked={this.props.categories[name]}
											onChange={this.props.onChange}/>
		);
	}

	render() {
		return (
			<Filter name="Category">
				{this.renderCategories()}
			</Filter>
		);
	}
}

CategoryFilter.propTypes = {
	onChange:   React.PropTypes.func.isRequired,
	categories: React.PropTypes.object.isRequired
};

export default CategoryFilter;