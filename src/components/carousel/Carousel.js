import React from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/build/image-gallery.css";

const Carousel = ({className, style, children}) => {
	const items = React.Children.toArray(children).map((image) => {
			return {
				original: image.props.src,
				originalAlt: "product"
			}
	});

	return (
		<div className={className} style={style}>
			<Gallery items={items}/>
		</div>
	);
};

Carousel.propTypes = {
	style:     React.PropTypes.object,
	className: React.PropTypes.string,
	children:  React.PropTypes.node
};

Carousel.defaultProps = {
	style:     {},
	className: ""
};

export default Carousel;