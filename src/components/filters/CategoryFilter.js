import React, {Component} from "react";
import {connect} from "react-redux";
import Filter from "./filter/Filter";
import CategoryInput  from "../inputs/CategoryInput";
import {createDefaultObjectFrom} from "../../utils/objectUtils";

const mapStateToProps = ({categories}) => ({categories});

class CategoryFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: createDefaultObjectFrom(this.props.categories, false)
		}
	}

	getCategory(categories) {
		return Object.keys(categories).find(key => categories[key]);
	}

	renderCategories() {
		const categories = Object.keys(this.state.categories);

		return categories.map((name) =>
			<CategoryInput key={name}
											id={name}
											description={name}
											checked={this.props.categories[name]}
											onChange={this.state.onCategoryChange}/>
		);
	}

	getUpdatedCategories(category) {
		const {categories}  = this.state.categories,
					newCategories = createDefaultObjectFrom(categories, false);

		newCategories[category] = !categories[category];

		return newCategories;
	}

	onCategoryChange(event) {
		const category = event.target.id,
					updatedCategories = this.getUpdatedCategories(category);

		this.setState({
			category: updatedCategories
		});

		this.props.onChange(this.getCategory(updatedCategories));
	}

	render() {
		return (
			<Filter title="Category" error={this.props.error}>
				{this.renderCategories()}
			</Filter>
		);
	}
}

CategoryFilter.propTypes = {
	onChange:   React.PropTypes.func.isRequired,
	categories: React.PropTypes.object.isRequired,
	error:      React.PropTypes.string
};

export default connect(mapStateToProps)(CategoryFilter);