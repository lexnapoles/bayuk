//Modified redux real-world example pagination (https://github.com/reactjs/redux/blob/master/examples/real-world/src/reducers/paginate.js)
import union from 'lodash/union'
import {isAsyncActionType} from "../constants/actionTypes";

const paginate = ({type, reset}) => {
  if (!isAsyncActionType(type)) {
    throw new Error("Type is not an async action type");
  }

  const {request, success, failure} = type;

  const defaultState = {
    isFetching:  false,
    nextPageUrl: undefined,
    ids:         [],
    pageCount:   0
  };

  return (state = defaultState, action) => {
    switch (action.type) {
      case reset:
        return defaultState;

      case request:
        return {
          ...state,
          isFetching: true
        };
      case success:
        return {
          ...state,
          isFetching:  false,
          ids:         union(state.ids, action.payload.result),
          nextPageUrl: action.payload.nextPageUrl,
          pageCount:   state.pageCount + 1
        };
      case failure:
        return {
          ...state,
          isFetching: false
        };
      default:
        return state
    }
  }
};

export default paginate;
