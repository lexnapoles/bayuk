import {createStore} from "redux";

const reducer = (state) => state;

const initialState = {
	products: [
		{
			id:       1,
			photo:    "http://placehold.it/140x100",
			name:     "Vetusta Morla",
			description: "Great album of one of the best groups in Spain.",
			category: "Music",
			price:    10
		},

		{
			id:       2,
			photo:    "http://placehold.it/140x100",
			name:     "Golding",
			description: "I'm selling this amazing movie, you'll love it.",
			category: "Movies",
			price:    20
		},

		{
			id:       3,
			photo:    "http://placehold.it/140x100",
			name:     "Some man's videogame",
			description: "Videogame for PS4, never used.",
			category: "Videogames",
			price:    50
		},

		{
			id:       4,
			photo:    "http://placehold.it/140x100",
			name:     "Journey",
			description: "A journey to the wildest lands, I'm the author. Great book, garanteed",
			category: "Literature",
			price:    500
		}
	]
}

export default createStore(reducer, initialState);
