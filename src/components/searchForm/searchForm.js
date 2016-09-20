import React, {Component} from "react";
import styles from "./searchForm.css";
import CSSModules from "react-css-modules";
import FormHeader from "../formHeader/FormHeader";
import NameFilter from "../filters/nameFilter/NameFilter";
import PriceFilter from "../filters/PriceFilter";
import CategoryFilter from "../filters/CategoryFilter";

class SearchForm extends Component {
	render() {
		const {name, categories, submitForm, onNameChange, onCategoryChange, onPriceChange} = this.props,
					formName = "searchForm";

		return (
			<div styleName="container">
				<FormHeader formId={formName}/>
				<main styleName="main">
					<div styleName="formContainer">
						<form id={formName} styleName="form" onSubmit={submitForm}>
							<NameFilter name={name} placeholder="What are you looking for?" onChange={onNameChange}/>
							<CategoryFilter categories={categories} onChange={onCategoryChange}/>
							<PriceFilter onChange={onPriceChange}/>
						</form>
					</div>
				</main>
			</div>
		);
	}
}

SearchForm.propTypes = {
	name:             React.PropTypes.string.isRequired,
	categories:       React.PropTypes.object.isRequired,
	submitForm:       React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoryChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};

export default CSSModules(SearchForm, styles);
