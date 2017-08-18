import productSchema from '../../../schemas/product';
import { invalidProduct } from '../../../errors/api/productErrors';
import validateSchema from '../../../schemas/validateSchema';

export default product => validateSchema(product, productSchema, invalidProduct);
