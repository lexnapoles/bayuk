import {createStore} from "redux";
import {v4} from "node-uuid";

const reducer = (state) => state;

const initialState = {
	products: [
		{
			id:          v4(),
			photo:       "http://placehold.it/140x100",
			name:        "Vetusta Morla",
			description: "Great album of one of the best groups in Spain.",
			category:    "Music",
			price:       10
		},

		{
			id:          v4(),
			photo:       "http://placehold.it/140x100",
			name:        "Golding",
			description: "I'm selling this amazing movie, you'll love it.",
			category:    "Movies",
			price:       20
		},

		{
			id:          v4(),
			photo:       "http://placehold.it/140x100",
			name:        "Videogame",
			description: "Videogame for PS4, never used.",
			category:    "Videogames",
			price:       50
		},

		{
			id:          v4(),
			photo:       "http://placehold.it/140x100",
			name:        "Journey",
			description: "A journey to the wildest lands, I'm the author. Great book, garanteed",
			category:    "Literature",
			price:       500
		}
	]
}

const configureStore = () => {
	return createStore(reducer, initialState);
}

export default configureStore;
