import {combineReducers} from "redux";
import products from "./products";
import categories from "./categories";
import * as fromProducts from "./products";

export const getProductById = ({products}, id) => fromProducts.getProductById(products, id);

export const getAllProducts = (({products}) => fromProducts.getAllProducts(products));

export default combineReducers({
	products,
	categories
});