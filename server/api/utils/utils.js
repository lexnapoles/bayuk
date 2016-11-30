export const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

export const mapArraysSequentially = (arr1, arr2) => func =>  arr1.map((val, index) => func(arr1[index], arr2[index]));