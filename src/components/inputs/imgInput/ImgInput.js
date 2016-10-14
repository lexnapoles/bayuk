import React, {Component} from "react";
import Filter from "../../filters/filter/Filter";

class ImgInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: []
		};

		this.handleFiles = this.handleFiles.bind(this);
		this.isImage= this.isImage.bind(this);
	}

	isImage(file) {
		return /^image\//.test(file.type);
	}

	handleFiles() {
		const selectedFiles = [...this.refs.input.files];

		const images = selectedFiles.filter(file => this.isImage(file));

		this.setState({images});
	}

	render() {
		return (
			<Filter title="Pictures">
				<input type="file" multiple accept="image/*" ref="input" onChange={this.handleFiles}/>
			</Filter>
		)
	}
}


export default ImgInput;