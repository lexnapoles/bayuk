import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./sidebarMenu.css";

// class SidebarMenu extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {visible: false};
//
// 		this.toggleVisible = (event) => {
// 			event.preventDefault();
// 			this.setState({visible: !this.state.visible})
// 		};
// 	}
//
// 	componentDidMount() {
// 		document.addEventListener("click", this.toggleVisible);
// 	}
//
// 	componentWillUnmount() {
// 		document.removeEventListener("click", this.toggleVisible);
// 	}
//
// 	render() {
//
// 		const isVisible = this.state.visible
// 			? "sidebarLeftIsVisible"
// 			: "sidebarLeft";
//
// 		return (
// 			<div styleName={isVisible} ref="sidebar">
// 				Sidebar
// 			</div>
// 		);
// 	}
// }


class SidebarMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {width: 0};

		this.setSidebarWidth = this.setSidebarWidth.bind(this);
	}

	componentDidMount() {
		this.setSidebarWidth();
	}

	setSidebarWidth() {
		this.setState({
			width: this.refs.sidebar.offsetWidth
		});
	}

	render() {
		let style = {};

		if (this.state.width) {
			style = {
				left: this.props.hidden ? -this.state.width : 0
			};
		}

		return (
			<div styleName="sidebar" style={style} ref="sidebar">
				Wololol
			</div>
		)
	}
}


SidebarMenu.propTypes = {
	width: React.PropTypes.number,
	hidden: React.PropTypes.bool
};

SidebarMenu.defaultProps = {
	hidden: true
};

export default CSSModules(SidebarMenu, styles);   
