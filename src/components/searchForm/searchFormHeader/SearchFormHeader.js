import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./searchFormHeader.css";
import Icon from "react-fa";
import Header from "../../header/Header";
import ReturnIcon from "../../icons/returnIcon/ReturnIcon";

class SearchHeader extends Component {
	render() {
		return (
			<Header>
					<ReturnIcon url="/"/>
					<div styleName="check">
						<button styleName="checkButton" form={this.props.formId}>
							<Icon name="check" size="lg"/>
						</button>
					</div>
			</Header>
		);
	}
}

SearchHeader.propTypes = {
	formId: React.PropTypes.string.isRequired
}

export default CSSModules(SearchHeader, styles);