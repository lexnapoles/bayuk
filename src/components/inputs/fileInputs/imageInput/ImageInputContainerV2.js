import React, {Component} from "react";
import ImageInputV2 from "./ImageInputV2";

class ImageInputContainerV2 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: ""
		};

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
					this.setState({url});
					this.props.onAdd(url);
				});
	}

	onDelete() {
		this.setState({
			url: ""
		});

		this.props.onDelete();
	}

	render() {
		return <ImageInputV2 url={this.state.url} onAdd={this.onAdd} onDelete={this.onDelete} id={this.props.id}/>
	}
}

ImageInputContainerV2.propTypes = {
	id:       React.PropTypes.number.isRequired,
	onAdd:    React.PropTypes.func.isRequired,
	onDelete: React.PropTypes.func.isRequired
};

export default ImageInputContainerV2;
