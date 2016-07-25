import React, {Component} from "react";

class Carousel extends Component {
	render() {
		const pictureToShow = Array.isArray(this.props.children)
			? this.props.children[0]
			: this.props.children;

		return (
			<div>
				{pictureToShow}
			</div>
		);
	}
}

Carousel.propTypes = {
	children: React.PropTypes.node
}

export default Carousel;
