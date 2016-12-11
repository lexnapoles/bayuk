import db from "../../db";

export const getCategories = () => db.any("SELECT * FROM categories");