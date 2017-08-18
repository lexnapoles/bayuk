const isAsyncActionType = (action, { request, success }) => action[request] && action[success];

const findType = (action, key, type) => type[key] === action.type;

const defaultKeys = { request: 'request', success: 'success' };

const isFetching = (actions, keys = defaultKeys) =>
  (state = true, action) => {
    if (!Array.isArray(actions)) {
      actions = [actions];
    }

    const someActionIsNotAsync = actions.some(anAction => !isAsyncActionType(anAction));

    if (someActionIsNotAsync) {
      throw new Error('isFetching error: actions are not async action types');
    }

    const request = actions.find(findType.bind(undefined, action, keys.request));
    const success = actions.find(findType.bind(undefined, action, keys.success));

    if (request) {
      return true;
    } else if (success) {
      return false;
    }

    return state;
  };

export default isFetching;
