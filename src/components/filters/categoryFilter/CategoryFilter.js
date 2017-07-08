import {connect} from "react-redux";
import CheckBoxFilterContainer  from "../checkBoxFilter/CheckBoxFilterContainer";
import {getAllCategories} from "../../../reducers/root";

const mapStateToProps = state => {
	const {items: options} = getAllCategories(state);

	return {
		options,
		title: "Categories"
	}
};

export default connect(mapStateToProps)(CheckBoxFilterContainer);
