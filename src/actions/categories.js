import {fetchCategories} from "./api";

export const loadCategories = () =>  (dispatch, getState) => {
	const categories = getState().entities.categories.items;

	if (categories && categories.length) {
		return null;
	}

	return dispatch(fetchCategories());
};
