import productSchema from "../../schemas/product";
import {invalidProduct} from "../../../errors/api/productErrors";
import {tokenDoesNotMatch} from "../../../errors/api/authorizationErrors";
import {validateSchema} from "../validators";

export const validateProduct = product => validateSchema(product, productSchema, invalidProduct);

export const validateTokenWithProduct = (token, product) => token.id !== product.owner ? [tokenDoesNotMatch()] : [];
