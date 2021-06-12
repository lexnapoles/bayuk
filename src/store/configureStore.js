import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, autoRehydrate } from "redux-persist";
import { apiMiddleware } from "redux-api-middleware";
import thunkMiddleware from "redux-thunk";
import addProductMiddleware from "../middlewares/addProductMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import rootReducer from "../reducers/root";

const middlewares = [
  thunkMiddleware,
  apiMiddleware,
  addProductMiddleware,
  authMiddleware
];

/* eslint-disable no-underscore-dangle */

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares), autoRehydrate())
  );

  /* eslint-enable */

  persistStore(store, {
    whitelist: ["currentUser"]
  });

  return store;
};

export default configureStore;
