import React, {Component} from "react";
import ImagesFilter from "./ImagesFilter";


class ImagesFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.onAddImage = this.onAddImage.bind(this);
		this.onDeleteImage = this.onDeleteImage.bind(this);
	}

	getImagesFrom(obj) {
		const keys = Object.keys(obj);

		return keys.map(key => obj[key]);
	}

	onAddImage(position, image) {
		const newState = Object.assign({}, this.state, {[position]: image}),
					images   = this.getImagesFrom(newState);

		this.setState(newState);

		this.props.onChange(images);
	}

	onDeleteImage(position) {
		const state = Object.assign({}, this.state);

		delete state[position];

		this.setState(state);

		const images = this.getImagesFrom(state);

		this.props.onChange(images);
	}

	render() {
		return <ImagesFilter maxImages={this.props.maxImages} onAdd={this.onAddImage} onDelete={this.onDeleteImage}/>;
	}
}

ImagesFilterContainer.propTypes = {
	maxImages: React.PropTypes.number.isRequired,
	onChange:  React.PropTypes.func.isRequired
};

export default ImagesFilterContainer;