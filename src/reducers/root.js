import {combineReducers} from "redux";
import products from "./products";
import categories from "./categories";
import errorMessage from "./errorMessage";
import currentUser from "./currentUser";
import users from "./users";
import * as fromProducts from "./products";
import * as fromUsers from "./users";
import * as fromUser from "./currentUser";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);
export const getAllProducts = ({products}) => fromProducts.getAllProducts(products);

export const getCurrentUser = ({currentUser}) => fromUser.getCurrentUser(currentUser);
export const isLoggedIn = ({currentUser}) => fromUser.isLoggedIn(currentUser);

export const getUserById = ({users}, id) => fromUsers.getUserById(users, id);
export const getAllUsers = ({users}) => fromUsers.getAllUsers(users);


export default combineReducers({
	currentUser,
	users,
	products,
	categories,
	errorMessage
});