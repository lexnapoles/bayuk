import { findKey } from "lodash/object";

export default ({ categories, ...restOfParams }) => {
  const checkedCategory = findKey(categories, checked => checked);

  return {
    category: checkedCategory,
    ...restOfParams
  };
};
