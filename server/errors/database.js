import { queryResultErrorCode } from "../database/db";

export default {
  dataAlreadyExists: "23505",
  dataNotFound: queryResultErrorCode.noData
};
