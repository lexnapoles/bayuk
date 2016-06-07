import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./sidebarMenu.css";

class SidebarMenuWithOverlay extends Component {
	constructor(props) {
		super(props);

		this.state = {sidebarWidth: 0};
	}

	componentDidMount() {
		this.setSidebarWidth();
	}

	setSidebarWidth() {
		this.setState({
			sidebarWidth: this.refs.sidebar.offsetWidth
		});
	}

	getStyle() {
		return this.state.width
			? {left: this.props.hidden	? -this.state.sidebarWidth	: 0}
			: {}
	}

	render() {
		return (
			<div>
				<div styleName="sidebar" style={this.getStyle()} ref="sidebar">
					{this.props.children}
				</div>
				<div styleName="overlay">
				</div>
			</div>

		)
	}
}

SidebarMenuWithOverlay.propTypes = {
	hidden: React.PropTypes.bool,
	children: React.PropTypes.node
};

SidebarMenuWithOverlay.defaultProps = {
	hidden: true
};

export default CSSModules(SidebarMenuWithOverlay, styles);
