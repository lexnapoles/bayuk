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

	getSidebarStyle() {
		return this.state.sidebarWidth
			? {left: this.props.visible	? 0 : -this.state.sidebarWidth}
			: {}
	}

	getOverlayStyle() {
		return this.state.sidebarWidth
			? {left: this.props.visible	? this.state.sidebarWidth : 0}
			: {}
	}

	render() {
		return (
			<div>
				<div styleName="sidebar" style={this.getSidebarStyle()} ref="sidebar">
					{this.props.children}
				</div>
				<div styleName="overlay" style={this.getOverlayStyle()}>
				</div>
			</div>

		)
	}
}

SidebarMenuWithOverlay.propTypes = {
	visible: React.PropTypes.bool,
	children: React.PropTypes.node
};

SidebarMenuWithOverlay.defaultProps = {
	visible: false
};

export default CSSModules(SidebarMenuWithOverlay, styles);
