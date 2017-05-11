import {invalidUser} from "../../../errors/api/userErrors";
import {tokenDoesNotMatchUser} from "../../../errors/api/authorizationErrors";
import {validateSchema} from "../validators";
import {register, login} from "../../schemas/user";

export const validateRegister = user => validateSchema(user, register, invalidUser);

export const validateLogin = user => validateSchema(user, login, invalidUser);

export const validateTokenWithUser = (token, user) => token.id !== user.userId ? [tokenDoesNotMatchUser()] : [];
