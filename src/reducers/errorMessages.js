const errorMessage = (state = null, action) => {
  const { error, payload } = action;

  if (error && payload) {
    return payload.response;
  }

  return state;
};

export default errorMessage;
