import {fetchCategories} from "./api";
import {getAllCategories} from "../reducers/root";

export const loadCategories = () =>  (dispatch, getState) => {
	const categories = getAllCategories(getState());

	if (categories && categories.length) {
		return null;
	}

	return dispatch(fetchCategories("categories"));
};
