 import {Schema, arrayOf} from "normalizr";

export const product = new Schema("products");

export const arrayOfProducts = arrayOf(product);