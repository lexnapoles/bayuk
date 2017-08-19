import { invalidUser } from '../../../errors/api/userErrors';
import validateSchema from '../../../schemas/validateSchema';
import { register, login, user as userSchema } from '../../../schemas/user';

export const validateRegister = user => validateSchema(user, register, invalidUser);

export const validateLogin = user => validateSchema(user, login, invalidUser);

export const validateUser = user => validateSchema(user, userSchema, invalidUser);
