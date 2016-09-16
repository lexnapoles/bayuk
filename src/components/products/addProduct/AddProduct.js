import React, {Component} from "react";
import FormHeader from "../../formHeader/FormHeader";

class AddProduct extends Component {
	render() {
		return (
			<div>
				<FormHeader/>
				<main>
					<div>
						<form>
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