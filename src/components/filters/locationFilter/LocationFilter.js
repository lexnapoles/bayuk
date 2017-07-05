import PropTypes from 'prop-types';
import React from "react";
import Filter from "../filter/Filter";
import Geosuggest from 'react-geosuggest';
import 'react-geosuggest/module/geosuggest.css';

const LocationFilter = ({onChange}) => {

	return (
		<Filter title="Location">
			<Geosuggest placeholder="Where do you want to find?" onSuggestSelect={onChange}/>
		</Filter>
	);
};

LocationFilter.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default LocationFilter;

