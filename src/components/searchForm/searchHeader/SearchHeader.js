import React, {Component} from "react";
import CSSModules from "react-css-modules";

import {header, nav} from "../../layout.css";
import styles from "./searchHeader.css";
import {Link} from "react-router";
import Icon from "react-fa";

class SearchHeader extends Component {
	render() {
		return (
			<header className={header}>
				<nav className={nav}>
					<Link to={"/"} >
						<Icon name="arrow-left" size="lg" styleName="returnIcon"/>
					</Link>
					<div styleName="check">
						<button styleName="checkButton" form={this.props.formId}>
							<Icon name="check" size="lg"/>
						</button>
					</div>
				</nav>
			</header>
		);
	}
}

SearchHeader.propTypes = {
	formId: React.PropTypes.string.isRequired
}

export default CSSModules(SearchHeader, styles);
