import {createStore, applyMiddleware} from "redux";
import {persistStore, autoRehydrate} from 'redux-persist'
import {apiMiddleware} from "redux-api-middleware";
import addProductMiddleware from "../middlewares/addProductMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import rootReducer from "../reducers/root";

const middlewares = [apiMiddleware, addProductMiddleware, authMiddleware];

if (process.env.NODE_ENV !== "production") {
	const createLogger = require("redux-logger");

	const logger = createLogger({
		actionTransformer: (action) => ({
			...action,
			type: String(action.type)
		})
	});

	middlewares.push(logger);
}

const configureStore = () => {
	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares),
		autoRehydrate()
	);

	persistStore(store, {
		whitelist: ["user"]
	});

	return store;
};

export default configureStore;
