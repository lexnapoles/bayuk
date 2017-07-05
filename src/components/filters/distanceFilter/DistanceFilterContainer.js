import React, {PropTypes, Component} from "react";
import DistanceFilter  from "./DistanceFilter";
import {createDefaultObjectFrom} from "../../../utils";

class DistanceOptionsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				"1km":   false,
				"5km":   false,
				"10km":  false,
				">10km": false
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
		return <DistanceFilter onChange={this.onOptionChange} options={this.state.options}/>;
	}
}

DistanceOptionsContainer.propTypes = {
	onChange:  PropTypes.func.isRequired,
	exclusive: PropTypes.bool,
};

DistanceOptionsContainer.defaultProps = {
	exclusive: true
};

export default DistanceOptionsContainer;
