import {createStore, applyMiddleware} from "redux";
import {apiMiddleware} from "redux-api-middleware";
import addProductMiddleware from "../middlewares/addProductMiddleware";
import rootReducer from "../reducers/root";

const configureStore = () => {
	return createStore(
		rootReducer,
		applyMiddleware(apiMiddleware, addProductMiddleware)
	);
};

export default configureStore;
