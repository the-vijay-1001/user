import express from "express";
import { save,view } from "../controller/order.controller.js";
import { verify } from "../middleware/authenticate.js";

const router = express.Router();
router.post("/save",verify,save);
router.get("/view",verify,view);
export default router;