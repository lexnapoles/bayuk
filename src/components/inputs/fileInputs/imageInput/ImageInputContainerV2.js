import React, {Component} from "react";
import ImageInputV2 from "./ImageInputV2";

class ImageInputContainerV2 extends Component {
	constructor(props) {
		super(props);

		this.onAdd = this.onAdd.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	isAnImage(file) {
		return /^image\//.test(file.type);
	}

	loadImage(img) {
		return new Promise(function (resolve, reject) {
			const reader = new FileReader();

			reader.onload = event => resolve(event.target.result);
			reader.onerror = event => reject(event.target.error);

			reader.readAsDataURL(img);
		})
	}

	onAdd(event) {
		const selectedFile = event.target.files[0];

		if (!this.isAnImage(selectedFile)) {
			return;
		}

		this.loadImage(selectedFile)
				.then(url => {
					this.props.onAdd(url);
				});
	}

	onDelete() {
		this.props.onDelete();
	}

	render() {
		return <ImageInputV2 url={this.props.url} onAdd={this.onAdd} onDelete={this.onDelete} id={this.props.id}/>
	}
}

ImageInputContainerV2.propTypes = {
	url:      React.PropTypes.string,
	id:       React.PropTypes.number.isRequired,
	onAdd:    React.PropTypes.func.isRequired,
	onDelete: React.PropTypes.func.isRequired
};

ImageInputContainerV2.defaultProps = {
	url: ""
};

export default ImageInputContainerV2;
