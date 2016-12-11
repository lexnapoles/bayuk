import {ADD_PRODUCT} from "../constants/actionTypes";

export const addProduct = (product) => ({
	type:    ADD_PRODUCT,
	payload:  {product}
});