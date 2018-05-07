const errorMessage = (state = "", action) => {
  const { error, payload } = action;

  if (error && payload.response) {
    return payload.response;
  }

  return state;
};

export default errorMessage;
