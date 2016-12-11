import React, {Component} from "react";
import {connect} from "react-redux";
import Filter from "../filter/Filter";
import CategoryInput  from "../../inputs/CategoryInput";
import {createDefaultObjectFrom} from "../../../utils/objectUtils";

const mapStateToProps = ({categories}) => ({categories});

class CategoryFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: createDefaultObjectFrom(this.props.categories, false)
		};

		this.onCategoryChange = this.onCategoryChange.bind(this);
	}

	getCategory(categories) {
		return Object.keys(categories).find(key => categories[key]);
	}

	getUpdatedCategories(category) {
		const {categories}  = this.state,
					newCategories = createDefaultObjectFrom(categories, false);

		newCategories[category] = !categories[category];

		return newCategories;
	}

	onCategoryChange(event) {
		const category          = event.target.id,
					updatedCategories = this.getUpdatedCategories(category);

		this.props.onChange(this.getCategory(updatedCategories));

		this.setState({
			categories: updatedCategories
		});
	}

	renderCategories() {
		const categories = this.props.categories;

		return categories.map((name) =>
			<CategoryInput key={name}
											id={name}
											description={name}
											checked={this.state.categories[name]}
											onChange={this.onCategoryChange}/>
		);
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
	categories: React.PropTypes.array.isRequired,
	onChange:   React.PropTypes.func.isRequired,
	error:      React.PropTypes.string
};

export default connect(mapStateToProps)(CategoryFilter);
