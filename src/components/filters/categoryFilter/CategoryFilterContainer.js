import PropTypes from 'prop-types';
import React, { Component } from "react";
import {connect} from "react-redux";
import CategoryFilter  from "./CategoryFilter";
import {createDefaultObjectFrom} from "../../../utils";
import {getAllCategories} from "../../../reducers/root";

class CategoryFilterContainer extends Component {
	componentWillReceiveProps({categories, extraCategories}) {
		const noPreviousCategories = !this.props.categories.length;

		if (noPreviousCategories && categories.length) {
			this.setState({
				categories: createDefaultObjectFrom([...categories, ...extraCategories], false)
			});
		}
	}

	constructor(props) {
		super(props);

		const {categories, extraCategories} = this.props;

		this.state = {
			categories: createDefaultObjectFrom([...categories, ...extraCategories], false)
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
		const {isFetching, error} = this.props;

		return <CategoryFilter isFetching={isFetching} onChange={this.onCategoryChange} categories={this.state.categories} error={error}/>;
	}
}

CategoryFilterContainer.propTypes = {
	categories:      PropTypes.array.isRequired,
	extraCategories: PropTypes.array,
	onChange:        PropTypes.func.isRequired,
	error:           PropTypes.string,
	exclusive:       PropTypes.bool,
	isFetching:      PropTypes.bool
};

CategoryFilterContainer.defaultProps = {
	exclusive:       true,
	isFetching:      false,
	extraCategories: []
};

const mapStateToProps = state => {
	const {isFetching, items} = getAllCategories(state);

	return items.length ? {isFetching, categories: items} : {isFetching: true, categories: []};
};

export default connect(mapStateToProps)(CategoryFilterContainer);
