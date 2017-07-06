import React, {Component} from "react";
import {logo} from "./homeHeader.css";
import Icon from "react-fa";
import SearchIcon from "../../icons/searchIcon/SearchIcon";
import SidebarMenu from "../../sidebarMenu/SidebarMenu";
import Header from "../../header/Header";
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
				<SearchIcon/>
			</Header>
		);
	}
}

export default HomeHeader;