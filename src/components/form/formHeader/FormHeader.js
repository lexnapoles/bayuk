import PropTypes from 'prop-types';
import React from "react";
import {check} from "./formHeader.css";
import Header from "../../header/Header";
import ReturnIcon from "../../icons/returnIcon/ReturnIcon";
import CheckIcon from "../../icons/checkIcon/CheckIcon";

const FormHeader = ({redirect, formId}) =>
	<Header>
		<ReturnIcon url={redirect}/>
		<div className={check}>
			<CheckIcon formId={formId}/>
		</div>
	</Header>

FormHeader.propTypes = {
	formId:   PropTypes.string.isRequired,
	redirect: PropTypes.string
}

FormHeader.defaultProps = {
	redirect: "/"
};

export default FormHeader;