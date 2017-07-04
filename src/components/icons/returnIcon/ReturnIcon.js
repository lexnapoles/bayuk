import React, {PropTypes} from "react";
import {Link} from "react-router";
import Icon from "react-fa";
import {returnIcon} from "./returnIcon.css";

const ReturnIcon = ({url}) =>
	<Link to={url}>
		<Icon name="arrow-left" size="lg" className={returnIcon}/>
	</Link>

ReturnIcon.propTypes = {
	url: PropTypes.string.isRequired
}

export default ReturnIcon;