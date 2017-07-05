import {findKey} from "lodash/object";

export const onCheckBoxChange = options => {
	const checkbox = findKey(options, checkbox => checkbox);

	return checkbox ? checkbox : ""
};

export const onRangeChange =  (key, event, previousState)=> ({
	...previousState[key],
	[event.target.id]: parseInt(event.target.value)
});
