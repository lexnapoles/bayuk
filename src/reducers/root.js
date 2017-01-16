import {combineReducers} from "redux";
import products from "./products";
import categories from "./categories";
import errorMessage from "./errorMessage";
import user from "./user";
import * as fromProducts from "./products";
import * as fromUser from "./user";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);
export const getAllProducts = ({products}) => fromProducts.getAllProducts(products);

export  const getCurrentUser = ({user}) => fromUser.getCurrentUser(user);
export const isLoggedIn = ({user}) => fromUser.isLoggedIn(user);

export default combineReducers({
	user,
	products,
	categories,
	errorMessage
});