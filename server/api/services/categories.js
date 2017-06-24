import db from "../../database/db";
import {categories} from "../../database/sql/sql";
import {wrapDataInPromise} from "../../utils";

const addCategoryToDB = category => db.none(categories.add, category);

export const getCategories = () => db.any(categories.get);

export const addCategories = categories => Promise.all(wrapDataInPromise(categories, addCategoryToDB));