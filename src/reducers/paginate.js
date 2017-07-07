//Modified redux real-world example pagination (https://github.com/reactjs/redux/blob/master/examples/real-world/src/reducers/paginate.js)
import union from 'lodash/union'
import {isAsyncActionType} from "../constants/actionTypes";

const paginate = ({type, mapActionToKey}) => {
	if (!isAsyncActionType(type)) {
		throw new Error("Type is not an async action type");
	}

	const {request: requestType, success: successType, failure: failureType} = type;

	const updatePagination = (state = {
		isFetching:  false,
		nextPageUrl: undefined,
		ids:         []
	}, action) => {
		switch (action.type) {
			case requestType:
				return {
					...state,
					isFetching: true
				};
			case successType:
				return {
					...state,
					isFetching:  false,
					ids:         union(state.ids, action.payload.result),
					nextPageUrl: action.payload.nextPageUrl
				};
			case failureType:
				return {
					...state,
					isFetching: false
				};
			default:
				return state
		}
	};

	return (state = {}, action) => {
		switch (action.type) {
			case requestType:
			case successType:
			case failureType: {
				if (!mapActionToKey) {
					return {
						...state,
						...updatePagination(void 0, action)
					};
				}

				if (typeof mapActionToKey !== 'function') {
					throw new Error('Expected mapActionToKey to be a function.')
				}

				const key = mapActionToKey(action);

				if (typeof key !== 'string') {
					throw new Error('Expected key to be a string.')
				}

				return {
					...state,
					[key]: updatePagination(state[key], action)
				}
			}
			default:
				return state
		}
	}
};

export default paginate;
