import bodyParser from "body-parser";
import verifyUser from "../../middlewares/verifyUser";
import auth from "../../middlewares/auth";
import {
  readUsers,
  readOneUser,
  updateOneUser,
  updateUserEmail,
  updateUserPassword,
  deleteOneUser
} from "../controllers/users/users";

const jsonParser = bodyParser.json({ limit: "50mb" });

export default router => {
  router.get("/users", readUsers);
  router.get("/users/:userId", readOneUser);

  router.put("/users/:userId", auth, verifyUser, jsonParser, updateOneUser);

  router.put(
    "/users/:userId/email",
    auth,
    verifyUser,
    jsonParser,
    updateUserEmail
  );
  router.put(
    "/users/:userId/password",
    auth,
    verifyUser,
    jsonParser,
    updateUserPassword
  );

  router.delete("/users/:userId", auth, verifyUser, deleteOneUser);

  return router;
};
