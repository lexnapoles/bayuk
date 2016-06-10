import React, {Component} from "react";
import styles from "./header.css";
import CSSModules from "react-css-modules";
import Icon from "react-fa";
import SidebarMenu from "../sidebarMenu/SidebarMenu";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {sidebarVisible: false};

		this.toggleSidebarVisibility = this.toggleSidebarVisibility.bind(this);
	}

	toggleSidebarVisibility() {
		this.setState({sidebarVisible: !this.state.sidebarVisible});
	}

	render() {
		return (
			<div styleName="header">
				<nav styleName="nav">
					<SidebarMenu visible={this.state.sidebarVisible} onOverlayClicked={this.toggleSidebarVisibility}>
						Menu
					</SidebarMenu>
					<Icon name="bars" size="lg" className="menuIcon" onClick={this.toggleSidebarVisibility}/>
					<div styleName="logo">Bayuk</div>
					<Icon name="search" size="lg"/>
				</nav>
			</div>
		)
	}
}

export default CSSModules(Header, styles);