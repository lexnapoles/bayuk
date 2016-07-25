import React, {Component} from "react";

class Carousel extends Component {
	render() {
		return (
			<div>
				{this.pictureToShow()}
			</div>
		);
	}

	pictureToShow() {
		return Array.isArray(this.props.children)
			? this.props.children[0]
			: this.props.children;
	}
}

Carousel.propTypes = {
	children: React.PropTypes.node
}

export default Carousel;
