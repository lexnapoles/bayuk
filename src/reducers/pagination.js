import {combineReducers} from "redux";
import paginate from "./paginate";
import {FETCH_PRODUCTS, SEARCH_PRODUCTS} from "../constants/actionTypes";

export default combineReducers({
	"productsByDistance": paginate({type: FETCH_PRODUCTS}),
	"searchedProducts":   paginate({type: SEARCH_PRODUCTS})
});

export const getProductsByDistance = ({productsByDistance}) => productsByDistance;

export const getSearchedProducts= ({searchedProducts}) => searchedProducts;