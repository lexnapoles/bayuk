import React, {Component} from "react";
import {container, header, nav, main} from "../layout.css";
import styles from "./searchForm.css";
import CSSModules from "react-css-modules";
import {Link} from "react-router";
import Icon from "react-fa";

class SearchForm extends Component {
	render() {
		return (
			<div className={container}>
				<header className={header}>
					<nav className={nav}>
						<Link to={"/"} >
							<Icon name="arrow-left" size="lg" styleName="returnIcon"/>
						</Link>
						<div styleName="checkIcon">
							<Icon name="check" size="lg"/>
						</div>
					</nav>
				</header>
				<main className={main}>
					<form styleName="searchForm">
						<input placeholder="Name" />
						<input placeholder="Category" />
						<input placeholder="Price" />
					</form>
				</main>
			</div>
		);
	}
}

export default CSSModules(SearchForm, styles);
