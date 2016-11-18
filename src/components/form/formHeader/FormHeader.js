import React from "react";
import {check} from "./formHeader.css";
import Header from "../../header/Header";
import ReturnIcon from "../../icons/returnIcon/ReturnIcon";
import CheckIcon from "../../icons/checkIcon/CheckIcon";

const FormHeader = ({formId}) =>
	<Header>
		<ReturnIcon url="/"/>
		<div className={check}>
			<CheckIcon formId={formId}/>
		</div>
	</Header>

FormHeader.propTypes = {
	formId: React.PropTypes.string.isRequired
}

export default FormHeader;