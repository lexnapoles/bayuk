import {combineReducers} from "redux";
import products from "./products";
import categories from "./categories";
import errorMessage from "./errorMessage";
import currentUser from "./currentUser";
import * as fromProducts from "./products";
import * as fromUser from "./currentUser";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);
export const getAllProducts = ({products}) => fromProducts.getAllProducts(products);

export  const getCurrentUser = ({currentUser}) => fromUser.getCurrentUser(currentUser);
export const isLoggedIn = ({currentUser}) => fromUser.isLoggedIn(currentUser);

export default combineReducers({
	currentUser,
	products,
	categories,
	errorMessage
});