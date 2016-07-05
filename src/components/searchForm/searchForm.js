import React, {Component} from "react";
import {container, header, nav, main} from "../layout.css";
import styles from "./searchForm.css";
import CSSModules from "react-css-modules";
import {Link} from "react-router";
import Icon from "react-fa";

import NameFilter from "./NameFilter";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name:       "",
			categories: {"Music": false, "Videgames": false, "Movies": false, "Literature": false},
			price:      {min: 0, max: 0}
		};

		this.submitForm = this.submitForm.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
	}

	submitForm(event) {
		event.preventDefault();

	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	onPriceChange(event) {
		Object.assign(this.state.price, {
			[event.target.id]: event.target.value
		});

		this.setState({price: this.state.price});
	}

	onCategoryChange(event) {
		const name = event.target.id,
					categories = this.state.categories;

		Object.assign(categories, {
			[name]: !categories[name]
		});

		this.setState({categories});
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
						<NameFilter name={this.state.name} onChange={this.onNameChange} />
						<CategoryFilter categories={this.state.categories} onChange={this.onCategoryChange} />
						<PriceFilter onChange={this.onPriceChange} />
					</form>
				</main>
			</div>
		);
	}
}

export default CSSModules(SearchForm, styles);
