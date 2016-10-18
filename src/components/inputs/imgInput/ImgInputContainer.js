import React, {Component} from "react";
import ImgInput from "./ImgInput";

class ImgInputContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			urls: []
		};

		this.handleFile = this.handleFile.bind(this);
		this.loadImage = this.loadImage.bind(this);
	}

	componentWillReceiveProps({images}) {
		if (!images.length) {
			return;
		}

		const lastImage = images[images.length - 1];

		this.loadImage(lastImage);
	}

	isAnImage(file) {
		return /^image\//.test(file.type);
	}

	loadImage(img) {
		const reader = new FileReader();

		reader.onload = event => this.setState({
			urls: [...this.state.urls, event.target.result]
		});

		reader.readAsDataURL(img);
	}

	handleFile(event) {
		const selectedFile = event.target.files[0];

		if (!this.isAnImage(selectedFile)) {
			return;
		}

		this.props.onChange(selectedFile);
	}

	render() {
		return <ImgInput urls={this.state.urls} onChange={this.handleFile}/>;
	}
}

ImgInputContainer.propTypes = {
	images:   React.PropTypes.array.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default ImgInputContainer;