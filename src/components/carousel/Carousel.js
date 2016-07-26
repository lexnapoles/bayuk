import React, {Component} from "react";
import CSSModules from "react-css-modules";
import {Icon, IconStack} from "react-fa";
import styles from "./carousel.css";

class Carousel extends Component {
	render() {
		return (
			<div styleName="carousel">
				<div styleName="arrowsContainer">
					<button styleName="leftArrow">
						<IconStack>
							<Icon name="circle" stack="2x" inverse={true}/>
							<Icon name="angle-left" stack="1x" />
						</IconStack>
					</button>

					<button styleName="rightArrow">
						<IconStack>
							<Icon name="circle" stack="2x" inverse={true}/>
							<Icon name="angle-right" stack="1x" />
						</IconStack>
					</button>
				</div>
				<img styleName="image" src="http://placekitten.com/700/700" alt="kitty"/>
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

export default CSSModules(Carousel, styles);
