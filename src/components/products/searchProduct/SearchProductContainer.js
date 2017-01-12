import connectForm from "../../form/connectForm/connectForm";
import SearchProduct from "./SearchProduct";

const elements = ["name", "categories", "price"];

const defaultFormState = {
	price: {min: 0, max: 0}
};

const handlers = {
	onCategoriesChange: categories => categories,
	onPriceChange: (event, {price}) => ({
		...price, [event.target.id]: parseInt(event.target.value)
	})
};

const props = {
	elements,
	handlers,
	defaultFormState,
	onSubmit: () => void 0
};

export default connectForm(props)(SearchProduct);