import React, {Component} from "react";
import {overlay, sidebar} from "./sidebarMenu.css";

class SidebarMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {sidebarWidth: 0};

		this.onOverlayClicked = this.onOverlayClicked.bind(this);
	}

	componentDidMount() {
		this.setSidebarWidth();
	}

	setSidebarWidth() {
		this.setState({
			sidebarWidth: this.sidebar.getBoundingClientRect().width
		});
	}

	getSidebarStyle() {
		return this.state.sidebarWidth
			? {left: this.props.visible ? 0 : -this.state.sidebarWidth}
			: {}
	}

	getOverlayStyle() {
		if (this.state.sidebarWidth) {
			const visible = this.props.visible;

			return {
				left: 			visible	? this.state.sidebarWidth	: 0,
				visibility: visible	? "visible"	: "hidden",
				opacity:    visible	? 0.5	: 0
			};
		}

		return {opacity: 0};
	}

	onOverlayClicked() {
		if (this.props.visible) {
			this.props.onOverlayClicked();
		}
	}

	render() {
		return (
			<div>
				<div className={sidebar} style={this.getSidebarStyle()} ref={div => this.sidebar = div}>
					{this.props.children}
				</div>
				<div className={overlay} style={this.getOverlayStyle()} onClick={this.onOverlayClicked}>
				</div>
			</div>

		)
	}
}

SidebarMenu.propTypes = {
	visible:          React.PropTypes.bool,
	onOverlayClicked: React.PropTypes.func.isRequired,
	children:         React.PropTypes.node
};

SidebarMenu.defaultProps = {
	visible: false
};

export default SidebarMenu;

