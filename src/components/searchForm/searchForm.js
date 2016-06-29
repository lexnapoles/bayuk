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
						<div styleName="filter">
							<label htmlFor="name" styleName="title">Name</label>
							<hr/>
							<input id="name" type="text" placeholder="Name" />
						</div>
						<div styleName="filter">
							<label styleName="title">Category</label>
							<hr/>
							<div>
								<div>
									<label htmlFor="Music">Music</label>
									<input id="Music" type="checkbox"/>
								</div>
								<div>
									<label htmlFor="Videogames">Videogames</label>
									<input id="Videogames" type="checkbox"/>
								</div>
								<div>
									<label htmlFor="Movies">Movies</label>
									<input id="Movies" type="checkbox"/>
								</div>
								<div>
									<label htmlFor="Literature">Literature</label>
									<input id="Literature" type="checkbox"/>
								</div>
							</div>
						</div>
						<div styleName="filter">
							<label styleName="title">Price</label>
							<hr/>
							<div >
								<label htmlFor="minPrice">Min price</label>
								<input id="minPrice" type="number" min="0" step="0.01" />
							</div>
							<div>
								<label htmlFor="maxPrice">Max price</label>
								<input id="maxPrice" type="number" min="0" step="0.01" />
							</div>
						</div>
					</form>
				</main>
			</div>
		);
	}
}

export default CSSModules(SearchForm, styles);
