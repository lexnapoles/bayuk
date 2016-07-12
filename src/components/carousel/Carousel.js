import React, {Component} from "react";

class Carousel extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

Carousel.propTypes = {
	children: React.PropTypes.node
}

export default Carousel;
