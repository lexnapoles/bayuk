import productSchema from "../../schemas/product";
import {invalidProduct} from "../../../errors/api/productErrors";
import {validateSchema} from "../validators";

export const validateProduct = product => validateSchema(product, productSchema, invalidProduct);