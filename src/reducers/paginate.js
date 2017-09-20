// Modified redux real-world example pagination (https://github.com/reactjs/redux/blob/master/examples/real-world/src/reducers/paginate.js)
import union from 'lodash/union';
import { isAsyncActionType } from '../constants/actionTypes';

const paginate = ({ type, reset, mapActionToKey }) => {
  if (!isAsyncActionType(type)) {
    throw new Error('Type is not an async action type');
  }

  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const { request, success, failure } = type;

  const defaultState = {
    isFetching: false,
    nextPageUrl: undefined,
    ids: [],
    pageCount: 0,
  };

  const updatePagination = (state = defaultState, action) => {
    switch (action.type) {
      case reset:
        return defaultState;

      case request:
        return {
          ...state,
          isFetching: true,
        };
      case success:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.payload.result),
          nextPageUrl: action.payload.nextPageUrl,
          pageCount: state.pageCount + 1,
        };
      case failure:
        return {
          ...state,
          isFetching: false,
        };
      default:
        return state;
    }
  };

  return (state = {}, action) => {
    switch (action.type) {
      case request:
      case success:
      case failure:
      case reset: {
        const key = mapActionToKey(action);

        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }

        return {
          ...state,
          [key]: updatePagination(state[key], action),
        };
      }
      default:
        return state;
    }
  };
};

export default paginate;
