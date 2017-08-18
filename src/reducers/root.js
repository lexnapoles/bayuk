import { combineReducers } from 'redux';
import errorMessagesReducer from './errorMessages';
import currentUserReducer, * as fromUser from './currentUser';
import entitiesReducer, * as fromEntities from './entities';
import locationReducer, * as fromLocation from './location';
import paginationReducer, * as fromPagination from './pagination';

export const getAllCategories = ({ entities }) => fromEntities.getAllCategories(entities);

export const getProductById = ({ entities }, id) => fromEntities.getProductById(entities, id);

export const getListOfProductsById = ({ entities }, ids) =>
  fromEntities.getListOfProductsById(entities, ids);

export const getAllProducts = ({ entities }) => fromEntities.getAllProducts(entities);

export const getUserById = ({ entities }, id) => fromEntities.getUserById(entities, id);
export const getAllUsers = ({ entities }) => fromEntities.getAllUsers(entities);

export const getProductsByDistancePagination = ({ pagination }) =>
  fromPagination.getProductsByDistance(pagination);

export const getSearchedProductsPagination = ({ pagination }) =>
  fromPagination.getSearchedProducts(pagination);

export const getCurrentUser = ({ currentUser }) => fromUser.getCurrentUser(currentUser);
export const isUserLoggedIn = ({ currentUser }) => fromUser.isUserLoggedIn(currentUser);

export const getGeolocation = ({ location }) => fromLocation.getGeolocation(location);

export default combineReducers({
  entities: entitiesReducer,
  currentUser: currentUserReducer,
  pagination: paginationReducer,
  location: locationReducer,
  errorMessages: errorMessagesReducer,
});
