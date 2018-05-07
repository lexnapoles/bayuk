import { combineReducers } from "redux";
import errorMessagesReducer from "./errorMessages";
import currentUserReducer, * as fromUser from "./currentUser";
import entitiesReducer, * as fromEntities from "./entities";
import locationReducer, * as fromLocation from "./location";
import paginationReducer, * as fromPagination from "./pagination";

export const getAllCategories = ({ entities }) =>
  fromEntities.getAllCategories(entities);

export const getProductById = ({ entities }, id) =>
  fromEntities.getProductById(entities, id);

export const getListOfProductsById = ({ entities }, ids) =>
  fromEntities.getListOfProductsById(entities, ids);

export const getAllProducts = ({ entities }) =>
  fromEntities.getAllProducts(entities);

export const getUserById = ({ entities }, id) =>
  fromEntities.getUserById(entities, id);
export const getAllUsers = ({ entities }) => fromEntities.getAllUsers(entities);

export const getProductsByFilter = ({ pagination }, filter) =>
  fromPagination.getProductsByFilter(pagination, filter);

export const getProductsSoldByUser = ({ pagination }, user) =>
  fromPagination.getProductsSoldByUser(pagination, user);

export const getProductsOnSellByUser = ({ pagination }, user) =>
  fromPagination.getProductsOnSellByUser(pagination, user);

export const getCurrentUser = ({ currentUser }) =>
  fromUser.getCurrentUser(currentUser);
export const isUserLoggedIn = ({ currentUser }) =>
  fromUser.isUserLoggedIn(currentUser);

export const getGeolocation = ({ location }) =>
  fromLocation.getGeolocation(location);

export const getReviews = ({ pagination }, userId) => fromPagination.getReviews(pagination, userId);

export const getListOfReviewsById = ({ entities }, ids) =>
  fromEntities.getListOfReviewsById(entities, ids);

export default combineReducers({
  entities: entitiesReducer,
  currentUser: currentUserReducer,
  pagination: paginationReducer,
  location: locationReducer,
  errorMessages: errorMessagesReducer
});
