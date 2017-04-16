import {has} from "lodash/object";
import {isEmpty} from "lodash/lang";
import {dataNotFound} from "./errors";

export const validateRequest = (req, field) =>
	!has(req, field) || isEmpty(req[field])
		? [dataNotFound(field)]
		: [];