import express from "express";
import { indexPage,signinPage,signin,signupPage,signout,signup} from "../controller/index.controller.js";
import { verify } from "../middleware/authenticate.js";
let router = express.Router();

router.get("/",indexPage);
router.get("/signin",signinPage);
router.post("/signin",signin);
router.get("/singup",signupPage);
router.post("/signup",signup)
router.get("/signout",verify,signout);
export default router;