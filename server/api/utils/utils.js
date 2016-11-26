export const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};
