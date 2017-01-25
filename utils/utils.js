import {isEmpty} from "lodash/lang";

export const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

export const mapArraysSequentially = (arr1 = [], arr2 = []) => {
	if (arr1.length > arr2.length) {
		[arr1, arr2] = [arr2, arr1];
	}

	return func => arr1.map((val, index) => func(val, arr2[index]));
};

export const generateImagesObjs = (ids, data) => mapArraysSequentially(ids, data)((id, data) => ({id, data}));

export const wrapDataInPromise = (dataArr, func) => {
	if (!dataArr.length) {
		return Promise.reject("No data has been passed");
	}

	return dataArr.map(data => Promise.resolve(func(data)));
};

export const isBase64 = file => file.search(/^data:image\/\w+;base64,/) !== -1;

export const hasProperties = (obj = {}, props) => {
	const f = (props = []) => props.every(key => key in obj);

	if (props && Array.isArray(props)) {
		return f(props, obj);
	}

	return f;
};

export const createDefaultObjectFrom = (base = {}, defaultValue = "") => {
	const keys = Array.isArray(base)
		? base
		: Object.keys(base);

	return keys.reduce((obj, key) => ({
		...obj,
		[key]: defaultValue
	}), {});
};

export const getErrorMessage = payload => payload.response.message;

export const getImagePath = (entity, imageId = "default") => `/image/${entity}/${imageId}.jpg`;

export const isNotEmpty = value => !isEmpty(value);

export const getJwtPayload = jwt => {
	const sections = jwt.split(".");

	return JSON.parse(atob(sections[1]));
};