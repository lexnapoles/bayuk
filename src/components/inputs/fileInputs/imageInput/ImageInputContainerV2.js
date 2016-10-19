import React, {Component} from "react";
import ImageInputV2 from "./ImageInputV2";

class ImageInputContainerV2 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: ""
		};

		this.onAdd = this.onAdd.bind(this);
	}

	isAnImage(file) {
		return /^image\//.test(file.type);
	}

	loadImage(img) {
		const reader = new FileReader();

		reader.onload = event => this.setState({
			url: event.target.result
		});

		reader.readAsDataURL(img);
	}

	onAdd(event) {
		const selectedFile = event.target.files[0];

		if(!this.isAnImage(selectedFile)) {
			return;
		}

		this.loadImage(selectedFile);

		this.props.onChange(selectedFile);
	}

	render() {
		return <ImageInputV2 url={this.state.url} onChange={this.onAdd} id={this.props.id}/>
	}
}

ImageInputContainerV2.propTypes = {
	id:       React.PropTypes.number.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default ImageInputContainerV2;
