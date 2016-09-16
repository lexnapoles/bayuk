import React, {Component} from "react";
import FormHeader from "../../formHeader/FormHeader";

class AddProduct extends Component {
	render() {
		const formName = "addForm";

		return (
			<div>
				<FormHeader formId={formName}/>
				<main>
					<div>
						<form id={formName}>
							Add form
						</form>
					</div>
				</main>
			</div>
		);
	}
}

AddProduct.propTypes = {};
AddProduct.defaultProps = {};

export default AddProduct;