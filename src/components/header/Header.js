import React, {Component} from "react";
import{header, nav, iconBox, logo, iconText} from "./header.css";
import Icon from "react-fa";

class Header extends Component {
	render() {
		return (
			<div className={header}>
				<nav className={nav}>
					<div className={iconBox}>
						<Icon name="bars" />
						<p className={iconText}>Menu</p>
					</div>
					<div className={logo}>Bayuk</div>
					<div className={iconBox}>
						<Icon name="search" />
						<p className={iconText}>Search</p>
					</div>
				</nav>
			</div>
		)
	}
}

export default Header;