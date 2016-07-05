import React, {Component} from "react";

import Filter from "./Filter";

class CategoryFilter extends Component {
	renderCategories() {
		const categories = Object.keys(this.props.categories);

		return categories.map((name) => {
			const isChecked = this.props.categories[name];

			return (
				<div key={name}>
					<label htmlFor={name}>{name}</label>
					<input id={name} type="checkbox" checked={isChecked} onChange={this.props.onChange}/>
				</div>
			)}
		)
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
	onChange: React.PropTypes.func.isRequired,
	categories: React.PropTypes.object.isRequired
};

export default CategoryFilter;
