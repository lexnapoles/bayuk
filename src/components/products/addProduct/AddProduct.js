import React, {Component} from "react";
import styles from "./addProduct.css";
import CSSModules from "react-css-modules";
import FormHeader from "../../formHeader/FormHeader";
import NameFilter from "../../filters/nameFilter/NameFilter";
import CategoryFilter from "../../filters/CategoryFilter";
import Filter from "../../filters/filter/Filter";

class AddProduct extends Component {
	render() {
		const {name, categories, submitForm, onNameChange, onCategoryChange, onPriceChange} = this.props,
					formName = "addForm";

		return (
			<div>
				<FormHeader formId={formName}/>
				<main styleName="main">
					<div styleName="formContainer">
						<form id={formName} styleName="form" onSubmit={submitForm}>
							<NameFilter name={name} placeholder="Product name" onChange={onNameChange}/>
							<CategoryFilter categories={categories} onChange={onCategoryChange}/>
							<Filter title="Price">
								<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
							</Filter>
						</form>
					</div>
				</main>
			</div>
		);
	}
}

AddProduct.propTypes = {
	name:             React.PropTypes.string.isRequired,
	categories:       React.PropTypes.object.isRequired,
	submitForm:       React.PropTypes.func.isRequired,
	onNameChange:     React.PropTypes.func.isRequired,
	onCategoryChange: React.PropTypes.func.isRequired,
	onPriceChange:    React.PropTypes.func.isRequired
};
AddProduct.defaultProps = {};

export default CSSModules(AddProduct, styles);