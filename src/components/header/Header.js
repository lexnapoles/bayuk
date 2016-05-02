import React, {Component} from "react";
import styles from "./header.css";
import CSSModules from "react-css-modules";
import Icon from "react-fa";

class Header extends Component {
	render() {
		return (
			<div  styleName="header">
				<nav  styleName="nav">
					<Icon name="bars" size="lg"/>
					<div  styleName="logo">Bayuk</div>
					<Icon name="search" size="lg"/>
				</nav>
			</div>
		)
	}
}

export default CSSModules(Header, styles);