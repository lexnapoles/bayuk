import React, {PropTypes, Component} from "react";
import ImagesFilter from "./ImagesFilter";

class ImagesFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: {}
		};

		this.onAddImage = this.onAddImage.bind(this);
		this.onDeleteImage = this.onDeleteImage.bind(this);
	}

	getImagesFrom(obj) {
		const keys = Object.keys(obj);

		return keys.map(key => obj[key]);
	}

	onAddImage(position, image) {
		const newState = {...this.state.images, [position]: image},
					images   = this.getImagesFrom(newState);

		this.setState({images: newState});

		this.props.onChange(images);
	}

	onDeleteImage(position) {
		const state = {...this.state.images};

		Reflect.deleteProperty(state, position);

		this.setState({images: state});

		const images = this.getImagesFrom(state);

		this.props.onChange(images);
	}

	render() {
		return <ImagesFilter urls={this.state.images} error={this.props.error} maxImages={this.props.maxImages} onAdd={this.onAddImage} onDelete={this.onDeleteImage}/>;
	}
}

ImagesFilterContainer.propTypes = {
	maxImages: PropTypes.number.isRequired,
	onChange:  PropTypes.func.isRequired,
	error:     PropTypes.string.isRequired
};

export default ImagesFilterContainer;