import {createStore} from "redux";
import {v4} from "node-uuid";
import rootReducer from "../reducers/root";

const initialState = {
	products: [
		{
			id:          v4(),
			photos:      [
				"http://placehold.it/200x200?text=slide1",
				"http://placehold.it/200x200?text=slide2",
				"http://placehold.it/200x200?text=slide3"
			],
			name:        "Vetusta Morla",
			description: "Great album of one of the best groups in Spain.",
			category:    "Music",
			price:       10
		},

		{
			id:          v4(),
			photos:      [
				"http://placehold.it/200x200?text=slide1",
				"http://placehold.it/200x200?text=slide2",
				"http://placehold.it/200x200?text=slide3"
			],
			name:        "Golding",
			description: "I'm selling this amazing movie, you'll love it.",
			category:    "Movies",
			price:       20
		},

		{
			id:          v4(),
			photos:      [
				"http://placehold.it/200x200?text=slide1",
				"http://placehold.it/200x200?text=slide2",
				"http://placehold.it/200x200?text=slide3"
			],
			name:        "Videogame",
			description: "Videogame for PS4, never used.",
			category:    "Videogames",
			price:       50
		},

		{
			id:          v4(),
			photos:      [
				"http://placehold.it/200x200?text=slide1",
				"http://placehold.it/200x200?text=slide2",
				"http://placehold.it/200x200?text=slide3"
			],
			name:        "Journey",
			description: "A journey to the wildest lands, I'm the author. Great book, garanteed",
			category:    "Literature",
			price:       500
		}
	]
};

const configureStore = () => {
	return createStore(rootReducer, initialState);
}

export default configureStore;
