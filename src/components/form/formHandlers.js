import { findKey } from 'lodash/object';

export const onCheckBoxChange = (options) => {
  const checkboxKey = findKey(options, checkbox => checkbox);

  return checkboxKey || '';
};

export const onRangeChange = (key, event, previousState) => ({
  ...previousState[key],
  [event.target.id]: parseInt(event.target.value, 10),
});
