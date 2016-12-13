import {createStore, applyMiddleware} from "redux";
import {apiMiddleware} from "redux-api-middleware";
import addProductMiddleware from "../middlewares/addProductMiddleware";
import rootReducer from "../reducers/root";


const middlewares = [apiMiddleware, addProductMiddleware];

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
	return createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	);
};

export default configureStore;
