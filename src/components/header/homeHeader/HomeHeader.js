import React, {Component} from "react";
import styles from "./homeHeader.css";
import CSSModules from "react-css-modules";
import {Link} from "react-router";
import Icon from "react-fa";
import SidebarMenu from "../../sidebarMenu/SidebarMenu";
import Header from "../Header";

class HomeHeader extends Component {
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
			<Header>
				<SidebarMenu visible={this.state.sidebarVisible} onOverlayClicked={this.toggleSidebarVisibility}>
					Menu
				</SidebarMenu>
				<Icon className="menuIcon" name="bars" size="lg" onClick={this.toggleSidebarVisibility}/>
				<div styleName="logo">Bayuk</div>
				<Link to={"/search"}>
					<Icon name="search" size="lg" styleName="searchIcon"/>
				</Link>
			</Header>
		);
	}
}

export default CSSModules(HomeHeader, styles);