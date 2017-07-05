import PropTypes from 'prop-types';
import React, {Component} from "react";
import SortFilter  from "./SortFilter";
import {createDefaultObjectFrom} from "../../../utils";

class SortFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				"Expensive": false,
				"Cheap":     false,
				"Distance":  false,
				"New":       false
			}
		};

		this.onOptionChange = this.onOptionChange.bind(this);
	}

	getUpdatedOptions(option) {
		const {options} = this.state,
					newOption = this.props.exclusive ? createDefaultObjectFrom(options, false) : {...options};

		newOption[option] = !options[option];

		return newOption;
	}

	onOptionChange(event) {
		const option         = event.target.id,
					updatedOptions = this.getUpdatedOptions(option);

		this.setState({
			options: updatedOptions
		});

		this.props.onChange(updatedOptions);
	}

	render() {
		return <SortFilter onChange={this.onOptionChange} options={this.state.options}/>;
	}
}

SortFilterContainer.propTypes = {
	onChange:  PropTypes.func.isRequired,
	exclusive: PropTypes.bool,
};

SortFilterContainer.defaultProps = {
	exclusive: true
};

export default SortFilterContainer;
