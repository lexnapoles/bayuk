import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./sidebarMenu.css";

class SidebarMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {width: 0};
	}

	componentDidMount() {
		this.setSidebarWidth();
	}

	setSidebarWidth() {
		this.setState({
			width: this.refs.sidebar.offsetWidth
		});
	}

	getStyle() {
		return this.state.width
			? {left: this.props.hidden	? -this.state.width	: 0}
			: {}
	}

	render() {
		return (
			<div styleName="sidebar" style={this.getStyle()} ref="sidebar">
				{this.props.children}
			</div>
		)
	}
}

SidebarMenu.propTypes = {
	width:  React.PropTypes.number,
	hidden: React.PropTypes.bool,
	children: React.PropTypes.node
};

SidebarMenu.defaultProps = {
	hidden: true
};

export default CSSModules(SidebarMenu, styles);   
