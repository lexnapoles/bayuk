 import {Schema, arrayOf} from "normalizr";

export const products = new Schema("products");
export const arrayOfProducts = arrayOf(products);