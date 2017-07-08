import {createStore, applyMiddleware} from "redux";
import {persistStore, autoRehydrate} from 'redux-persist'
import {createFilter} from 'redux-persist-transform-filter';
import {apiMiddleware} from "redux-api-middleware";
import thunkMiddleware from "redux-thunk";
import addProductMiddleware from "../middlewares/addProductMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import rootReducer from "../reducers/root";

const middlewares = [thunkMiddleware, apiMiddleware, addProductMiddleware, authMiddleware];

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

const currentUserPersistFilter = createFilter(
	"currentUser",
	["id", "token"]
);

const configureStore = () => {
	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares),
		autoRehydrate()
	);

	persistStore(store, {
		whitelist: ["currentUser"],
		transforms: [currentUserPersistFilter]
	});

	return store;
};

export default configureStore;
