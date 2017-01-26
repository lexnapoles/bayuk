import React, {Component} from "react";
import {logo, searchIcon} from "./homeHeader.css";
import {Link} from "react-router";
import Icon from "react-fa";
import SidebarMenu from "../../sidebarMenu/SidebarMenu";
import Header from "../Header";
import UserMenuThumbnailContainer from "../../user/userMenuThumbnail/UserMenuThumbnailContainer";

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
					<UserMenuThumbnailContainer/>
				</SidebarMenu>
				<Icon name="bars" size="lg" onClick={this.toggleSidebarVisibility}/>
				<div className={logo}>Bayuk</div>
				<Link to={"/search"}>
					<Icon name="search" size="lg" className={searchIcon}/>
				</Link>
			</Header>
		);
	}
}

export default HomeHeader;