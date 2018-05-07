import bodyParser from "body-parser";
import { register, login } from "../controllers/users/authentication";

const jsonParser = bodyParser.json({ limit: "50mb" });

export default router => {
  router.post("/register", jsonParser, register);
  router.post("/login", jsonParser, login);

  return router;
};
