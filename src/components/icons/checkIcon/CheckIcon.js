import React from 'react';
import {checkButton} from "./checkIcon.css";
import Icon from "react-fa";

const CheckIcon = ({formId}) => {
	return (
		<button className={checkButton} form={formId}>
			<Icon name="check" size="lg"/>
		</button>
	);
};

CheckIcon.propTypes = {
	formId: React.PropTypes.string.isRequired
};
CheckIcon.defaultProps = {};

export default CheckIcon;