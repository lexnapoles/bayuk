import {combineReducers} from "redux";
import products from "./products";
import categories from "./categories";
import errorMessage from "./errorMessage";
import user from "./user";
import * as fromProducts from "./products";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);

export const getAllProducts = (({products}) => fromProducts.getAllProducts(products));

export default combineReducers({
	user,
	products,
	categories,
	errorMessage
});