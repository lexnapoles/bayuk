import React, {Component} from "react";
import {header, nav, logo} from "./header.css";
import Icon from "react-fa";

class Header extends Component {
	render() {
		return (
			<div className={header}>
				<nav className={nav}>
					<Icon name="bars" size="lg"/>
					<div className={logo}>Bayuk</div>
					<Icon name="search" size="lg"/>
				</nav>
			</div>
		)
	}
}

export default Header;