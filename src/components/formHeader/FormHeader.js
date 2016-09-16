import React from "react";
import {check, checkButton} from "./formHeader.css";
import Icon from "react-fa";
import Header from "../header/Header";
import ReturnIcon from "../icons/returnIcon/ReturnIcon";

const FormHeader = ({formId}) =>
	<Header>
		<ReturnIcon url="/"/>
		<div className={check}>
			<button className={checkButton} form={formId}>
				<Icon name="check" size="lg"/>
			</button>
		</div>
	</Header>

FormHeader.propTypes = {
	formId: React.PropTypes.string.isRequired
}

export default FormHeader;