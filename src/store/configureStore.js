import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import addProductMiddleware from '../middlewares/addProductMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import rootReducer from '../reducers/root';

const middlewares = [thunkMiddleware, apiMiddleware, addProductMiddleware, authMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    actionTransformer: action => ({
      ...action,
      type: String(action.type),
    }),
  });

  middlewares.push(logger);
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
    autoRehydrate());

  persistStore(store, {
    whitelist: ['currentUser'],
  });

  return store;
};

export default configureStore;
