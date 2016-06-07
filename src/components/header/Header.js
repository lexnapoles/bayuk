import React, {Component} from "react";
import styles from "./header.css";
import CSSModules from "react-css-modules";
import Icon from "react-fa";
import SidebarMenu from "../sidebarMenu/SidebarMenu";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {sidebarHidden: true};

		this.toggleVisibility = this.toggleVisibility.bind(this);
	}

	toggleVisibility() {
		this.setState({sidebarHidden: false});
	}

	render() {
		return (
			<div styleName="header">
				<nav styleName="nav">
					<SidebarMenu hidden={this.state.sidebarHidden}/>
					<Icon name="bars" size="lg" className="menuIcon" onClick={this.toggleVisibility}/>
					<div styleName="logo">Bayuk</div>
					<Icon name="search" size="lg"/>
				</nav>
			</div>
		)
	}
}

export default CSSModules(Header, styles);