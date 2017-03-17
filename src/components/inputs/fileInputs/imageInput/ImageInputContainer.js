import React, {Component} from "react";
import ImageInput from "./ImageInput";
import {isAnImage, loadImage} from "../../../../../utils/utils";

class ImageInputContainer extends Component {
	constructor(props) {
		super(props);

		this.onAdd = this.onAdd.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	onAdd(event) {
		const selectedFile = event.target.files[0];

		if (!isAnImage(selectedFile)) {
			return;
		}

		loadImage(selectedFile)
			.then(url => {
				this.props.onAdd(url);
			});
}

	onDelete() {
		this.props.onDelete();
	}

	render() {
		return <ImageInput url={this.props.url} onAdd={this.onAdd} onDelete={this.onDelete} id={this.props.id}/>
	}
}

ImageInputContainer.propTypes = {
	url:      React.PropTypes.string,
	id:       React.PropTypes.number.isRequired,
	onAdd:    React.PropTypes.func.isRequired,
	onDelete: React.PropTypes.func.isRequired
};

ImageInputContainer.defaultProps = {
	url: ""
};

export default ImageInputContainer;
