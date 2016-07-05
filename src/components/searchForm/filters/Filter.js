import React, {Component} from "react";
import styles from "./filter.css";
import CSSModules from "react-css-modules";

class Filter extends Component {
	render() {
		const {name, children} = this.props;

		return (
			<div styleName="filter">
				<label styleName="title">{name}</label>
				<hr/>
				<div>
					{children}
				</div>
			</div>
		);
	}
}

Filter.propTypes = {
	name: React.PropTypes.string,
	children:  React.PropTypes.node
}



export default CSSModules(Filter, styles);
