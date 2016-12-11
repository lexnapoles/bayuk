import {SET_CATEGORIES} from "../constants/actionTypes";
import {normalize} from "normalizr";
import * as schema from "../actions/schema";

const byId = (state = {} ,action) => {
	switch (action.type) {
		case SET_CATEGORIES: {
			const normalizedCategories = normalize(action.payload, schema.arrayOfCategories);

			return normalizedCategories.entities.categories;
		}

		default:
			return state;
	}
};

const categories = (state = {}, action) => {
	switch (action.type) {
		case SET_CATEGORIES: {
			const normalizedCategories = normalize(action.payload, schema.arrayOfCategories);

			return normalizedCategories.entities.categories;
		}

		default:
			return state;
	}
};

export default categories;