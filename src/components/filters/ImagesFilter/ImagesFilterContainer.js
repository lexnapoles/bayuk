import React, {Component} from "react";
import ImagesFilter from "./ImagesFilter";

class ImagesFilterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			urls: []
		};

		this.handleFile = this.handleFile.bind(this);
	}

	componentWillReceiveProps({images: nextImages}) {
		const prevImages = this.props.images;

		for (let image of nextImages) {
			if (!prevImages.includes(image)) {
				this.loadImage(image);
			}
		}
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
		return <ImagesFilter urls={this.state.urls} onChange={this.handleFile}/>;
	}
}

ImagesFilterContainer.propTypes = {
	images:   React.PropTypes.array.isRequired,
	onChange: React.PropTypes.func.isRequired
};

export default ImagesFilterContainer;