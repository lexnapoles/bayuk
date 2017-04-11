import db from "../../db";
import {categories} from "../../sql/sql";
import {wrapDataInPromise} from "../../../utils/utils";

const addCategoryToDB = category => db.none(categories.add, category);

export const getCategories = () => db.any(categories.get);

export const addCategories = categories => Promise.all(wrapDataInPromise(categories, addCategoryToDB));