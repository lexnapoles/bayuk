import AuthForm from "./AuthForm";
import errorMsgs from "../../form/errors/errorsMsgs";
import {
	NO_NAME_FILLED,
	NO_EMAIL_FILLED,
	NO_PASSWORD_FILLED
} from "../../form/errors/errorConstants";
import connectForm from "../../form/connectForm/connectForm";
import {isNotEmpty} from "../../../../utils/utils";
const elements = ["name", "email", "password"];

const validation = {
	name:     (value, state, {signIn}) => signIn ? true : isNotEmpty(value),
	email:    isNotEmpty,
	password: isNotEmpty
};

const errorMessages = {
	name:     errorMsgs[NO_NAME_FILLED],
	email:    errorMsgs[NO_EMAIL_FILLED],
	password: errorMsgs[NO_PASSWORD_FILLED]
};

const props = {
	elements,
	validation,
	errorMessages,
	onSubmit: () => void 0
};

export default connectForm(props)(AuthForm);