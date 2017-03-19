import db from "../db";
import {categories} from "./config";
import {wrapDataInPromise} from "../../utils/utils";

const addCategory = category => db.none("INSERT INTO categories (category) VALUES ($1)", category);

export default () => Promise.all(wrapDataInPromise(categories, addCategory));
