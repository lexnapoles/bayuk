import React, {Component} from "react";
import FormHeader from "../../formHeader/FormHeader";
import NameFilter from "../../filters/nameFilter/NameFilter";
import CategoryFilter from "../../filters/CategoryFilter";
import PriceFilter from "../../filters/PriceFilter"

class AddProduct extends Component {
	render() {
		const {name, categories, submitForm, onNameChange, onCategoryChange, onPriceChange} = this.props,
					formName = "addForm";

		return (
			<div>
				<FormHeader formId={formName}/>
				<main>
					<div>
						<form id={formName} onSubmit={submitForm}>
							<NameFilter name={name} onChange={onNameChange}/>
							<CategoryFilter categories={categories} onChange={onCategoryChange}/>
							<PriceFilter onChange={onPriceChange}/>

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

export default AddProduct;