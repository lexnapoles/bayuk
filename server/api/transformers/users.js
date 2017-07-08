import {getImagePath} from "../../utils";

export const transformUser = user => ({
	id:        user.id,
	name:      user.name,
	email:     user.email,
	image:     getImagePath("user", user.image),
	latitude:  parseFloat(user.latitude),
	longitude: parseFloat(user.longitude),
});