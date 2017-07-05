import PropTypes from 'prop-types';
import React from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/build/image-gallery.css";

const Carousel = ({className, style, children}) => {
	const items = React.Children.toArray(children).map((image) => {
		return {
			original:    image,
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
	style:     PropTypes.object,
	className: PropTypes.string,
	children:  PropTypes.node
};

Carousel.defaultProps = {
	style:     {},
	className: ""
};

export default Carousel;