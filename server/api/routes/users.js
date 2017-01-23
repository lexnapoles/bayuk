import {readUsers, readOneUser} from "../controllers/users";

export default router => {
	router.get("/users", readUsers);
	router.get("/users/:userId", readOneUser);

	return router;
};