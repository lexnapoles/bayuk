import React, {Component} from "react";
import styles from "./header.css";

class Header extends Component {
	render() {
		const {header, nav, menu, logo, search} = styles;

		return (
			<div className={header}>
				<nav className={nav}>
					<span className={menu}></span>
					<div className={logo}>Bayuk</div>
					<span className={search}></span>
				</nav>
			</div>
		)
	}
}

export default Header;