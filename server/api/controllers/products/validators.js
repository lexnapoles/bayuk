import productSchema from "../../../schemas/product";
import {invalidProduct} from "../../../errors/api/productErrors";
import validateSchema from "../../../schemas/validateSchema";

export const validateProduct = product => validateSchema(product, productSchema, invalidProduct);