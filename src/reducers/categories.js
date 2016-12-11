import {combineReducers} from "redux";
import {SET_CATEGORIES} from "../constants/actionTypes";
import {normalize} from "normalizr";
import * as schema from "../actions/schema";

const byId = (state = {}, action) => {
	switch (action.type) {
		case SET_CATEGORIES: {
			const normalizedCategories = normalize(action.payload, schema.arrayOfCategories);

			return normalizedCategories.entities.categories;
		}

		default:
			return state;
	}
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case SET_CATEGORIES: {
			const normalizedCategories = normalize(action.payload, schema.arrayOfCategories);

			return normalizedCategories.result;
		}

		default:
			return state;
	}
};

const categories = combineReducers({
	byId,
	allIds
});

export default categories;

export const getAllCategories = state => state.allIds.map(id => state.byId[id].category);