import React, {Component} from "react";
import ImagesFilter from "./ImagesFilter";

class ImagesFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.handleFile = this.handleFile.bind(this);
	}

	handleFile(event) {
		const selectedFile = event.target.files[0];

		this.props.onChange(selectedFile);
	}

	render() {
		return <ImagesFilter onChange={this.handleFile}/>;
	}
}

ImagesFilterContainer.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default ImagesFilterContainer;