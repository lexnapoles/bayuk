const getParamsFromSearch = data => {
	let sort   = "",
			order  = "",
			radius = 0;

	const {latitude, longitude}          = data.location,
				{min: minPrice, max: maxPrice} = data.price;

	switch (data.sort) {
		case "distance":
			sort = "distance";
			order = "ascending";
			break;
		case "Expensive":
			sort = "price";
			order = "descending";
			break;
		case "Cheap":
			sort = "price";
			order = "ascending";
			break;
		case "New":
			sort = "date";
			order = "ascending";
			break;
		default:
			sort = "distance";
			order = "ascending";
			break;
	}

	switch (data.distance) {
		case "1km":
			radius = 1;
			break;
		case "5km":
			radius = 5;
			break;
		case "10km":
			radius = 10;
			break;
		default:
			radius = 99999;
	}

	return {
		name:     data.name,
		category: data.category,
		minPrice,
		maxPrice,
		sort,
		order,
		radius,
		latitude,
		longitude
	};
};

export default getParamsFromSearch;