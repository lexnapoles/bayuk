import { getGeolocation } from "../reducers/root";
import { UPDATE_GEOLOCATION } from "../constants/actionTypes";

export const updateGeolocation = coords => ({
  type: UPDATE_GEOLOCATION,
  payload: { coords }
});

export const loadGeolocation = coords => (dispatch, getState) => {
  const location = getGeolocation(getState());

  if (location) {
    return null;
  }

  return dispatch(updateGeolocation(coords));
};
