import React, {Component} from "react";
import styles from "./header.css";

class Header extends Component {
	render() {
		const {header, nav, menu, logo, search} = styles;

		return (
			<div className={header}>
				<nav className={nav}>
					<div className={menu}>Menu</div>
					<div className={logo}>Bayuk</div>
					<div className={search}>Search</div>
				</nav>
			</div>
		)
	}
}

export default Header;