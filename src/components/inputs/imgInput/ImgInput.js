import React, {Component} from "react";
import CSSModules from "react-css-modules";
import Filter from "../../filters/filter/Filter";
import styles from "./imgInput.css";

class ImgInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: [],
			urls:   []
		};

		this.handleFiles = this.handleFiles.bind(this);
	}

	isImage(file) {
		return /^image\//.test(file.type);
	}

	readUrlsFromImages(images) {
		images.forEach(image => {
			const reader = new FileReader();

			reader.onload = event => this.setState({
				urls: [...this.state.urls, event.target.result]
			});

			reader.readAsDataURL(image);
		})
	}

	handleFiles() {
		const selectedFiles = [...this.refs.input.files];

		const images = selectedFiles.filter(file => this.isImage(file));

		this.setState({images});

		this.readUrlsFromImages(images);
	}

	getImages() {
		const imgUrls = this.state.urls;

		return imgUrls.map(url =>
			<div key={url} styleName="thumbnailContainer">
				<img src={url} styleName="thumbnail"/>
			</div>
		);
	}

	render() {
		return (
			<Filter title="Pictures">
				<div styleName="preview">
					{this.getImages()}
				</div>
				<input type="file" multiple accept="image/*" ref="input" onChange={this.handleFiles}/>
			</Filter>
		)
	}
}

export default CSSModules(ImgInput, styles);