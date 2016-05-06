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
	}

	render() {
		const style = {
			position:   "absolute",
			top:        0,
			left:       0,
			height:     "100%",
			background: "grey"
		};

		return (
			<div className="sidebar" style={style} ref="sidebar">
				Wololol
			</div>
		)
	}
}

SidebarMenu.propTypes = {
	width: React.PropTypes.number
}

export default CSSModules(SidebarMenu, styles);   
