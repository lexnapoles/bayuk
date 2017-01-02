import bodyParser from "body-parser";
import {createUser} from "../controllers/users";

const jsonParser = bodyParser.json({limit: "50mb"});

export default router => {
	router.post("/users", jsonParser, createUser);

	return router;
};