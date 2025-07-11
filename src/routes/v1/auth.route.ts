import Express from "express";
import {
  loginWithOtp,
  registerWithPhone,
} from "../../controller/auth.controller";

const auth = Express.Router();

auth.post("/registerPhone", registerWithPhone);
auth.post("/loginwithotp", loginWithOtp);

export default auth;