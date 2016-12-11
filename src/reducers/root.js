import {combineReducers} from "redux";
import products from "./products";
import categories from "./categories";
import * as fromProducts from "./products";
import * as fromCategories from "./categories";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);

export const getAllCategories = ({categories}) => fromCategories.getAllCategories(categories);

export default combineReducers({
	products,
	categories
});