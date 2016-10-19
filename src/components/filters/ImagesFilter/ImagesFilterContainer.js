import React, {Component} from "react";
import ImagesFilter from "./ImagesFilter";

class ImagesFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.handleFile = this.handleFile.bind(this);
	}

	getImagesFrom(obj) {
		const keys = Object.keys(obj);

		return keys.map(key => obj[key]);
	}

	handleFile(position, image) {
		const newState = Object.assign({}, this.state, {[position]: image}),
					images   = this.getImagesFrom(newState);

		this.setState(newState);

		this.props.onChange(images);
	}

	render() {
		return <ImagesFilter onChange={this.handleFile}/>;
	}
}

ImagesFilterContainer.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default ImagesFilterContainer;