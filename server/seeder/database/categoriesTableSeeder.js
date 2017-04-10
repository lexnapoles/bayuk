import {addCategories} from "../../api/services/categories";
import {categories} from "../config";

export default () => addCategories(categories);