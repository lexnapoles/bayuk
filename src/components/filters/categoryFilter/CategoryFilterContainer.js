import React, {Component} from "react";
import {connect} from "react-redux";
import CategoryFilter  from "./CategoryFilter";
import {createDefaultObjectFrom} from "../../../utils/objectUtils";

const mapStateToProps = ({categories}) => ({
	categories
});

class CategoryFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: createDefaultObjectFrom(this.props.categories, false)
		};

		this.onCategoryChange = this.onCategoryChange.bind(this);
	}

	getUpdatedCategories(category) {
		const {categories}  = this.state,
					newCategories = this.props.exclusive ? createDefaultObjectFrom(categories, false) : {...categories};

		newCategories[category] = !categories[category];

		return newCategories;
	}

	onCategoryChange(event) {
		const category          = event.target.id,
					updatedCategories = this.getUpdatedCategories(category);

		this.setState({
			categories: updatedCategories
		});

		this.props.onChange(updatedCategories);
	}

	render() {
		return <CategoryFilter onChange={this.onCategoryChange} categories={this.state.categories} error={this.props.error}/>;
	}
}

CategoryFilterContainer.propTypes = {
	categories: React.PropTypes.array.isRequired,
	onChange:   React.PropTypes.func.isRequired,
	error:      React.PropTypes.string,
	exclusive:  React.PropTypes.bool
};

CategoryFilterContainer.defaultProps = {
	exclusive: true
};

export default connect(mapStateToProps)(CategoryFilterContainer);
