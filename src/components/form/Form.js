import React from "react";
import FormHeader from "./formHeader/FormHeader";
import {container, main, formContainer, form} from "./form.css";

const Form = ({title, formName, onSubmit, children}) => (
	<div className={container}>
		<FormHeader formId={formName}/>
		<main className={main}>
			<h1>{title}</h1>
			<div className={formContainer}>
				<form id={formName} className={form} onSubmit={onSubmit}>
					{children}
				</form>
			</div>
		</main>
	</div>
);

Form.propTypes = {
	title:    React.PropTypes.string,
	formName: React.PropTypes.string.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	children: React.PropTypes.node
}

Form.defaultProps = {
	title: ""
};

export default Form;