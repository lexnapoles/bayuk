const getParamsFromSearch = data => {
	let sort      = "",
      sortOrder = "",
      radius    = 0;

	const {latitude, longitude}          = data.location,
				{min: minPrice, max: maxPrice} = data.price;

	switch (data.sort) {
		case "distance":
			sort = "distance";
			sortOrder = "ascending";
			break;
		case "Expensive":
			sort = "price";
			sortOrder = "descending";
			break;
		case "Cheap":
			sort = "price";
			sortOrder = "ascending";
			break;
		case "New":
			sort = "date";
			sortOrder = "ascending";
			break;
		default:
			sort = "distance";
			sortOrder = "ascending";
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
    sortOrder,
		radius,
		latitude,
		longitude
	};
};

export default getParamsFromSearch;