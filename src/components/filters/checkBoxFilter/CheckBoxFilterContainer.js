import PropTypes from 'prop-types';
import React, {Component} from "react";
import CheckBoxFilter  from "./CheckBoxFilter";
import {createDefaultObjectFrom} from "../../../utils";

class CheckBoxFilterContainer extends Component {
	componentWillReceiveProps({options}) {
		const noPreviousOptions = !this.props.options.length;

		if (noPreviousOptions && options.length) {
			this.setState({
				options: createDefaultObjectFrom(options, false)
			});
		}
	}

	constructor(props) {
		super(props);

		const {options} = this.props;

		this.state = {
			options: createDefaultObjectFrom(options, false)
		};

		this.onOptionChange = this.onOptionChange.bind(this);
	}

	getUpdatedOptions(category) {
		const {options}  = this.state,
					newOptions = this.props.exclusive ? createDefaultObjectFrom(options, false) : {...options};

		newOptions[category] = !options[category];

		return newOptions;
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
		const {title, error} = this.props;

		return <CheckBoxFilter title={title} onChange={this.onOptionChange} options={this.state.options} error={error}/>;
	}
}

CheckBoxFilterContainer.propTypes = {
	title:     PropTypes.string.isRequired,
	options:   PropTypes.array.isRequired,
	onChange:  PropTypes.func.isRequired,
	error:     PropTypes.string,
	exclusive: PropTypes.bool
};

CheckBoxFilterContainer.defaultProps = {
	exclusive: true
};

export default CheckBoxFilterContainer;
