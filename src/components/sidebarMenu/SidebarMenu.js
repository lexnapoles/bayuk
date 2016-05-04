import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./sidebarMenu.css";

class SidebarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {visible: false};

		this.toggleVisible = (event) => {
			event.preventDefault();
			this.setState({visible: !this.state.visible})
		};
	}

	componentDidMount() {
		document.addEventListener("click", this.toggleVisible);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.toggleVisible);
	}

	render() {

		const isVisible = this.state.visible
			? "sidebarLeftIsVisible"
			: "sidebarLeft";

		return (
			<div styleName={isVisible} ref="sidebar">
				Sidebar
			</div>
		);
	}
}

export default CSSModules(SidebarMenu, styles);   
