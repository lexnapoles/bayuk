import {connect} from "react-redux";
import CheckBoxFilterContainer  from "../checkBoxFilter/CheckBoxFilterContainer";
import {getAllCategories} from "../../../reducers/root";

const mapStateToProps = state => {
	const {isFetching, items} = getAllCategories(state);

	return items.length ? {isFetching, options: items, title: "Categories"} : {isFetching: true, options: [], title: "Categories"};
};

export default connect(mapStateToProps)(CheckBoxFilterContainer);
