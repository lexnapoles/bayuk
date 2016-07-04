import React, {Component} from "react";
import {container, header, nav, main} from "../layout.css";
import styles from "./searchForm.css";
import CSSModules from "react-css-modules";
import {Link} from "react-router";
import Icon from "react-fa";

import Filter from "./Filter";

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			category: {"Music": false, "Videgames": false, "Movies": false, "Literature": false},
			price: {min: 0, max: 0}
		};

		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(event) {
		event.preventDefault();

		const searchData = {
			name:     this.refs.name.value,
			category: this.getCategories(),
			price:    this.getPrice()
		};

		this.setState(searchData);
	}

	getPrice() {
		return {
			min: this.refs.minPrice.value, 
			max: this.refs.maxPrice.value
		};
	}


	getCategories() {
		const categoryKeys = Object.keys(this.state.category);
		const categories = {};

		for (const category of categoryKeys) {
			Object.assign(categories, {[category]: this.refs[category].checked});
		}

		return categories;
	}

	renderCategories() {
		const categories = Object.keys(this.state.category);

		return categories.map((name) =>
			<div key={name}>
				<label htmlFor={name}>{name}</label>
				<input id={name} type="checkbox" ref={name}/>
			</div>
		)
	}
	render() {
		return (
			<div className={container}>
				<header className={header}>
					<nav className={nav}>
						<Link to={"/"} >
							<Icon name="arrow-left" size="lg" styleName="returnIcon"/>
						</Link>
						<div styleName="check">
							<button styleName="checkButton" form="searchForm">
								<Icon name="check" size="lg"/>
							</button>
						</div>
					</nav>
				</header>
				<main className={main}>
					<form id="searchForm" styleName="searchForm" onSubmit={this.submitForm}>

						<Filter name="Name">
							<input id="name" type="text" placeholder="Name" ref="name" required/>
						</Filter>

						<Filter name="Category">
							{this.renderCategories()}
						</Filter>

						<Filter name="Price">
							<div >
								<label htmlFor="minPrice">Min price</label>
								<input id="minPrice" type="number" min="0" step="0.01" ref="minPrice" required/>
							</div>
							<div>
								<label htmlFor="maxPrice">Max price</label>
								<input id="maxPrice" type="number" min="0" step="0.01" ref="maxPrice" required/>
							</div>
						</Filter>
					</form>
				</main>
			</div>
		);
	}
}

export default CSSModules(SearchForm, styles);
