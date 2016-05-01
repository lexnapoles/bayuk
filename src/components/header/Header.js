import React, {Component} from "react";
import styles from "./header.css";

class Header extends Component {
	render() {
		const {header, nav, menuIcon, logo, searchIcon, iconText} = styles;

		return (
			<div className={header}>
				<nav className={nav}>
					<div>
						<i className={menuIcon}></i>
						<p className={iconText}>Menu</p>
					</div>
					<div className={logo}>Bayuk</div>
					<div>
						<i className={searchIcon}></i>
						<p className={iconText}>Search</p>
					</div>
				</nav>
			</div>
		)
	}
}

export default Header;