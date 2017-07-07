import {combineReducers} from "redux";
import errorMessages from "./errorMessages";
import currentUser from "./currentUser";
import entities from "./entities";
import * as fromUser from "./currentUser";
import * as fromEntities from "./entities";

export const getAllCategories = ({entities}) => fromEntities.getAllCategories(entities);

export const getProductById = ({entities}, id) => fromEntities.getProductById(entities, id);
export const getAllProducts = ({entities}) => fromEntities.getAllProducts(entities);

export const getUserById = ({entities}, id) => fromEntities.getUserById(entities, id);
export const getAllUsers = ({entities}) => fromEntities.getAllUsers(entities);

export const getCurrentUser = ({currentUser}) => fromUser.getCurrentUser(currentUser);
export const isUserLoggedIn = ({currentUser}) => fromUser.isUserLoggedIn(currentUser);
export const getGeolocation = ({currentUser}) => fromUser.getGeolocation(currentUser);

export default combineReducers({
	entities,
	currentUser,
	errorMessages
});