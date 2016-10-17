import React, {Component} from "react";
import ImgInput from "./ImgInput";

class ImgInputContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: [],
			urls:   []
		};

		this.handleFile = this.handleFile.bind(this);
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

	imageAlreadyExists(img) {
		return this.state.images.some(someImg => someImg.name === img.name);
	}

	handleFile(event) {
		const selectedFile = event.target.files[0];

		if (!this.isAnImage(selectedFile) || this.imageAlreadyExists(selectedFile)) {
			return;
		}

		this.setState({
			images: [...this.state.images, selectedFile]
		});

		this.loadImage(selectedFile);
	}

	getImages() {
		const imgUrls = this.state.urls;

		return imgUrls.map((url, index) =>
			<div key={index} styleName="thumbnailContainer">
				<img src={url} styleName="thumbnail"/>
			</div>
		);
	}

	render() {
		return <ImgInput urls={this.state.urls} onChange={this.handleFile}/>;
	}
}

export default ImgInputContainer;