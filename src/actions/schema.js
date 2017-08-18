import { Schema, arrayOf } from 'normalizr';

export const products = new Schema('products');
export const arrayOfProducts = arrayOf(products);

export const users = new Schema('users');
export const arrayOfUsers = arrayOf(users);
