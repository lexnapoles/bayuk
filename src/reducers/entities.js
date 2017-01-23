import {combineReducers} from "redux";
import users from "./users";
import products from "./products"
import categories from "./categories";
import * as fromProducts from "./products";
import * as fromUsers from "./users";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);
export const getAllProducts = ({products}) => fromProducts.getAllProducts(products);

export const getUserById = ({users}, id) => fromUsers.getUserById(users, id);
export const getAllUsers = ({users}) => fromUsers.getAllUsers(users);

export const getAllCategories = ({categories}) => categories;

export default combineReducers({
	products,
	users,
	categories
});