import {combineReducers} from "redux";
import products from "./products";
import * as fromProducts from "./products";

export const getProductById = ({products}, id) =>
	fromProducts.getProductById(products, id);

export default combineReducers({
	products,
	categories: (state = []) => state
});