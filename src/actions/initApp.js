import {fetchProducts, fetchCategories, fetchUsers} from "./api";

export default store => {
	store.dispatch(fetchCategories());
	store.dispatch(fetchProducts());
	store.dispatch(fetchUsers());
}