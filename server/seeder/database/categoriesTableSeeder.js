import db from "../../db";
import {categories} from "../config";
import {wrapDataInPromise} from "../../../utils/utils";

const addCategoryToDB = category => db.none("INSERT INTO categories (category) VALUES ($1)", category);

const addAllCategoriesToDB = categories => Promise.all(wrapDataInPromise(categories, addCategoryToDB));

export default () =>  addAllCategoriesToDB(categories);