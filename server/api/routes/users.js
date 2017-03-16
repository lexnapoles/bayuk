import {createUser, createUserImage, readUsers, readOneUser, updateOneUser, deleteOneUser} from "../controllers/users";

export default router => {
	router.post("/users", createUser);

	router.get("/users", readUsers);
	router.get("/users/:userId", readOneUser);

	router.put("/users/:userId", updateOneUser);
	router.put("/users/:userId/image", createUserImage);

	router.delete("/users/:userId", deleteOneUser);

	return router;
};